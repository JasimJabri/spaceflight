<?php

class Spaceflight_API_Fetcher {

    const API_BASE = 'https://api.spaceflightnewsapi.net/v4/articles/';

    public static function fetch_and_cache() {
        $settings = get_option( 'spaceflight_settings', [] );
        $search = isset( $settings['search_phrase'] ) ? sanitize_text_field( $settings['search_phrase'] ) : '';
        $cutoff = isset( $settings['date_cutoff'] ) ? sanitize_text_field( $settings['date_cutoff'] ) : '';

        $params = [
            'limit' => 100,
	        'ordering' => '-published_at'
        ];

        if ( $search ) {
            $params['search'] = $search;
        }

        if ( $cutoff ) {
            $params['published_at_gte'] = gmdate( 'Y-m-d\TH:i:s\Z', strtotime( $cutoff ) );
        }

        $url = add_query_arg( $params, self::API_BASE );

        $response = wp_remote_get( $url, [ 'timeout' => 30 ] );

        if ( is_wp_error( $response ) ) {
            error_log( 'Spaceflight fetch failed: ' . $response->get_error_message() );
            return false;
        }

        if ( 200 !== (int) wp_remote_retrieve_response_code( $response ) ) {
            return false;
        }

        $body = json_decode( wp_remote_retrieve_body( $response ), true );

        if ( empty( $body['results'] ) ) {
            return false;
        }

        foreach ( $body['results'] as $article ) {
            Spaceflight_DB::upsert( $article );
        }

        update_option( 'spaceflight_last_fetch', current_time( 'mysql', true ) );

        return count( $body['results'] );
    }
}
