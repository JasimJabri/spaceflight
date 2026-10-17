<?php

class Spaceflight_Admin {

    public static function register() {
        add_action( 'admin_menu', [ __CLASS__, 'add_menu' ] );
        add_action( 'admin_init', [ __CLASS__, 'register_settings' ] );
        add_action( 'admin_post_spaceflight_fetch_now', [ __CLASS__, 'handle_fetch_now' ] );
    }

    public static function add_menu() {
        add_menu_page(
            __( 'Spaceflight News', 'spaceflight-news' ),
            __( 'Spaceflight News', 'spaceflight-news' ),
            'manage_options',
            'spaceflight-news',
            [ __CLASS__, 'render_page' ],
            'dashicons-rss',
            30
        );
    }

    public static function register_settings() {
        register_setting(
            'spaceflight_settings_group',
            'spaceflight_settings',
            [ __CLASS__, 'sanitize_settings' ]
        );
    }

    public static function sanitize_settings( $input ) {
        $clean = [];
        $clean['search_phrase'] = sanitize_text_field( $input['search_phrase'] ?? '' );
	    $clean['date_cutoff']   = sanitize_text_field( $input['date_cutoff'] ?? '' );
        $clean['frequency']     = max( 1, absint( $input['frequency'] ?? 60 ) );

        // Reschedule cron whenever settings are saved
        Spaceflight_Cron::reschedule();

        return $clean;
    }

    public static function handle_fetch_now() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( __( 'Unauthorized', 'spaceflight-news' ) );
        }
        check_admin_referer( 'spaceflight_fetch_now' );

        $count = Spaceflight_API_Fetcher::fetch_and_cache();

        $msg = $count !== false
            ? urlencode( sprintf( __( 'Fetched %d articles successfully.', 'spaceflight-news' ), $count ) )
            : urlencode( __( 'Fetch failed. Check error logs.', 'spaceflight-news' ) );

        wp_redirect( admin_url( 'admin.php?page=spaceflight-news&notice=' . $msg ) );
        exit;
    }

    public static function render_page() {
        $options    = get_option( 'spaceflight_settings', [] );
        $last_fetch = get_option( 'spaceflight_last_fetch', 'Never' );
        $next_fetch = wp_next_scheduled( Spaceflight_Cron::HOOK );
        $articles   = Spaceflight_DB::get_news( [ 'limit' => 10 ] );
        $total      = Spaceflight_DB::get_total_count();
        $notice     = isset( $_GET['notice'] ) ? sanitize_text_field( urldecode( $_GET['notice'] ) ) : '';
        ?>
        <div class="wrap">
            <h1><?php esc_html_e( 'Spaceflight News Settings', 'spaceflight-news' ); ?></h1>

            <?php if ( $notice ) : ?>
                <div class="notice notice-success is-dismissible"><p><?php echo esc_html( $notice ); ?></p></div>
            <?php endif; ?>

            <form method="post" action="options.php">
                <?php settings_fields( 'spaceflight_settings_group' ); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="search_phrase"><?php esc_html_e( 'Search Phrase', 'spaceflight-news' ); ?></label></th>
                        <td>
                            <input type="text" id="search_phrase" name="spaceflight_settings[search_phrase]"
                                value="<?php echo esc_attr( $options['search_phrase'] ?? '' ); ?>" class="regular-text" />
                            <p class="description"><?php esc_html_e( 'Filter articles by keyword (e.g. "SpaceX").', 'spaceflight-news' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="date_cutoff"><?php esc_html_e( 'Date Cutoff', 'spaceflight-news' ); ?></label></th>
                        <td>
                            <input type="date" id="date_cutoff" name="spaceflight_settings[date_cutoff]"
                                value="<?php echo esc_attr( $options['date_cutoff'] ?? '' ); ?>" />
                            <p class="description"><?php esc_html_e( 'Only fetch articles published on or after this date.', 'spaceflight-news' ); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th><label for="frequency"><?php esc_html_e( 'Update Frequency (minutes)', 'spaceflight-news' ); ?></label></th>
                        <td>
                            <input type="number" id="frequency" name="spaceflight_settings[frequency]"
                                value="<?php echo esc_attr( $options['frequency'] ?? 60 ); ?>" min="1" class="small-text" />
                            <p class="description"><?php esc_html_e( 'How often to automatically fetch new articles.', 'spaceflight-news' ); ?></p>
                        </td>
                    </tr>
                </table>
                <?php submit_button( __( 'Save Settings', 'spaceflight-news' ) ); ?>
            </form>

            <hr>

            <h2><?php esc_html_e( 'Manual Fetch', 'spaceflight-news' ); ?></h2>
            <p>
                <?php printf( esc_html__( 'Last fetch: %s', 'spaceflight-news' ), '<strong>' . esc_html( $last_fetch ) . '</strong>' ); ?>
                &nbsp;|&nbsp;
                <?php printf(
                    esc_html__( 'Next scheduled: %s', 'spaceflight-news' ),
                    '<strong>' . ( $next_fetch ? esc_html( gmdate( 'Y-m-d H:i:s', $next_fetch ) ) : esc_html__( 'Not scheduled', 'spaceflight-news' ) ) . '</strong>'
                ); ?>
            </p>
            <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
                <input type="hidden" name="action" value="spaceflight_fetch_now" />
                <?php wp_nonce_field( 'spaceflight_fetch_now' ); ?>
                <?php submit_button( __( 'Fetch Now', 'spaceflight-news' ), 'secondary' ); ?>
            </form>

            <hr>

            <h2><?php printf( esc_html__( 'Cached Articles (%d total)', 'spaceflight-news' ), $total ); ?></h2>
            <?php if ( $articles ) : ?>
                <table class="widefat striped">
                    <thead>
                        <tr>
                            <th><?php esc_html_e( 'Title', 'spaceflight-news' ); ?></th>
                            <th><?php esc_html_e( 'Site', 'spaceflight-news' ); ?></th>
                            <th><?php esc_html_e( 'Published', 'spaceflight-news' ); ?></th>
                            <th><?php esc_html_e( 'Cached At', 'spaceflight-news' ); ?></th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ( $articles as $article ) : ?>
                            <tr>
                                <td><a href="<?php echo esc_url( $article['url'] ); ?>" target="_blank"><?php echo esc_html( $article['title'] ); ?></a></td>
                                <td><?php echo esc_html( $article['news_site'] ); ?></td>
                                <td><?php echo esc_html( $article['published_at'] ); ?></td>
                                <td><?php echo esc_html( $article['cached_at'] ); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else : ?>
                <p><?php esc_html_e( 'No articles cached yet. Click "Fetch Now" to populate.', 'spaceflight-news' ); ?></p>
            <?php endif; ?>
        </div>
        <?php
    }
}
