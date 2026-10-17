<?php

class Spaceflight_DB {

    public static function get_table_name() {
        global $wpdb;
        return $wpdb->prefix . 'spaceflight_news';
    }

    public static function create_table() {
        global $wpdb;
        $table  = self::get_table_name();
        $charset = $wpdb->get_charset_collate();

        $sql = "CREATE TABLE IF NOT EXISTS {$table} (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            api_id BIGINT(20) UNSIGNED NOT NULL,
            title TEXT NOT NULL,
            url VARCHAR(2083) NOT NULL,
            image_url VARCHAR(2083) DEFAULT '',
            news_site VARCHAR(255) DEFAULT '',
            summary LONGTEXT DEFAULT '',
            published_at DATETIME NOT NULL,
            updated_at DATETIME NOT NULL,
            cached_at DATETIME NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY api_id (api_id),
            KEY published_at (published_at)
        ) {$charset};";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta( $sql );
    }

    public static function upsert( array $article ) {
        global $wpdb;
        $table = self::get_table_name();

        $data = [
            'api_id'       => absint( $article['id'] ),
	        'title'        => sanitize_text_field( $article['title'] ),
            'url'          => esc_url_raw( $article['url'] ),
            'image_url'    => esc_url_raw( $article['image_url'] ?? '' ),
            'news_site'    => sanitize_text_field( $article['news_site'] ?? '' ),
            'summary'      => wp_kses_post( $article['summary'] ?? '' ),
            'published_at' => gmdate( 'Y-m-d H:i:s', strtotime( $article['published_at'] ) ),
            'updated_at'   => gmdate( 'Y-m-d H:i:s', strtotime( $article['updated_at'] ) ),
            'cached_at'    => current_time( 'mysql', true ),
        ];

        $existing = $wpdb->get_var(
            $wpdb->prepare( "SELECT id FROM {$table} WHERE api_id = %d", $data['api_id'] )
        );

        if ( $existing ) {
            $wpdb->update( $table, $data, [ 'api_id' => $data['api_id'] ] );
        } else {
            $wpdb->insert( $table, $data );
        }
    }

    public static function get_news( array $args = [] ) {
        global $wpdb;
        $table = self::get_table_name();

        $limit  = isset( $args['limit'] )  ? absint( $args['limit'] )  : 10;
        $offset = isset( $args['offset'] ) ? absint( $args['offset'] ) : 0;
        $search = isset( $args['search'] ) ? sanitize_text_field( $args['search'] ) : '';

        if ( $search ) {
            return $wpdb->get_results(
                $wpdb->prepare(
                    "SELECT * FROM {$table} WHERE title LIKE %s ORDER BY published_at DESC LIMIT %d OFFSET %d",
                    '%' . $wpdb->esc_like( $search ) . '%',
                    $limit,
                    $offset
                ),
                ARRAY_A
            );
        }

        return $wpdb->get_results(
            $wpdb->prepare(
                "SELECT * FROM {$table} ORDER BY published_at DESC LIMIT %d OFFSET %d",
                $limit,
                $offset
            ),
            ARRAY_A
        );
    }

    public static function get_total_count() {
        global $wpdb;
        return (int) $wpdb->get_var( 'SELECT COUNT(*) FROM ' . self::get_table_name() );
    }
}
