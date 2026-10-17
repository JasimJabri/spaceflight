<?php

class Spaceflight_Cron {

    const HOOK = 'spaceflight_fetch_news';

    public static function register() {
        add_filter( 'cron_schedules', [ __CLASS__, 'add_intervals' ] );
        add_action( self::HOOK, [ 'Spaceflight_API_Fetcher', 'fetch_and_cache' ] );
    }

    public static function add_intervals( $schedules ) {
        $settings = get_option( 'spaceflight_settings', [] );
        $mins = absint( $settings['frequency'] ?? 60 );

        $schedules['spaceflight_custom'] = [
            'interval' => $mins * MINUTE_IN_SECONDS,
	        'display' => "Every $mins minutes"
        ];

        return $schedules;
    }

    public static function schedule() {
        if ( ! wp_next_scheduled( self::HOOK ) ) {
            wp_schedule_event( time(), 'spaceflight_custom', self::HOOK );
        }
    }

    public static function reschedule() {
        self::unschedule();
        self::schedule();
    }

    public static function unschedule() {
        $ts = wp_next_scheduled( self::HOOK );
        if ( $ts ) {
            wp_unschedule_event( $ts, self::HOOK );
        }
    }
}
