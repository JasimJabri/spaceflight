<?php
/**
 * Plugin Name: Spaceflight News
 * Description: Pulls in articles from the Spaceflight News API and caches them locally.
 * Version: 1.0.0
 * Author: Jasim Jabri
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'SFN_VERSION', '1.0.0' );
define( 'SFN_DIR', plugin_dir_path( __FILE__ ) );

require_once SFN_DIR . 'includes/class-db.php';
require_once SFN_DIR . 'includes/class-api-fetcher.php';
	require_once SFN_DIR . 'includes/class-cron.php';
require_once SFN_DIR . 'includes/class-admin.php';
require_once SFN_DIR . 'includes/class-graphql.php';

register_activation_hook( __FILE__, function() {
    Spaceflight_DB::create_table();
    Spaceflight_Cron::schedule();
});

register_deactivation_hook( __FILE__, ['Spaceflight_Cron', 'unschedule'] );

add_action( 'plugins_loaded', function() {
    Spaceflight_Cron::register();
    Spaceflight_Admin::register();
    Spaceflight_GraphQL::register();
});
