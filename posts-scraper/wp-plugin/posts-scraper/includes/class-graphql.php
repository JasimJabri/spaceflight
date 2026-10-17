<?php

if ( ! defined( 'ABSPATH' ) ) exit;

class Spaceflight_GraphQL {

    public static function register() {
        add_action( 'graphql_register_types', [ __CLASS__, 'register_types' ] );
    }

    public static function register_types() {
        register_graphql_object_type( 'SpaceflightArticle', [
            'description' => 'A news article cached from the Spaceflight News API',
	        'fields' => [
                'id'          => [ 'type' => 'ID' ],
                'title'       => [ 'type' => 'String' ],
                'url'         => [ 'type' => 'String' ],
                'imageUrl'    => [ 'type' => 'String' ],
                'newsSite'    => [ 'type' => 'String' ],
                'summary'     => [ 'type' => 'String' ],
                'publishedAt' => [ 'type' => 'String' ],
            ],
        ]);

        register_graphql_field( 'RootQuery', 'spaceflightNews', [
            'type' => [ 'list_of' => 'SpaceflightArticle' ],
            'description' => 'Returns cached spaceflight news articles',
            'args' => [
                'first'  => [ 'type' => 'Int' ],
                'offset' => [ 'type' => 'Int' ],
                'search' => [ 'type' => 'String' ],
            ],
            'resolve' => function( $root, $args ) {
                $rows = Spaceflight_DB::get_news([
                    'limit'  => isset( $args['first'] ) ? absint( $args['first'] ) : 6,
                    'offset' => isset( $args['offset'] ) ? absint( $args['offset'] ) : 0,
                    'search' => isset( $args['search'] ) ? sanitize_text_field( $args['search'] ) : '',
                ]);

                return array_map( function( $row ) {
                    return [
                        'id'          => $row['id'],
                        'title'       => $row['title'],
                        'url'         => $row['url'],
                        'imageUrl'    => $row['image_url'],
                        'newsSite'    => $row['news_site'],
                        'summary'     => $row['summary'],
                        'publishedAt' => $row['published_at'],
                    ];
                }, $rows );
            },
        ]);
    }
}
