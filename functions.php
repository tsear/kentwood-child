<?php
/**
 * Kentwood Child Theme functions
 */

// Load parent + child theme styles + scripts
add_action( 'wp_enqueue_scripts', function() {

    // 1) Parent theme stylesheet
    wp_enqueue_style(
        'kentwood-parent',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( get_template() )->get( 'Version' )
    );

    // 2) Child theme compiled SCSS
    wp_enqueue_style(
        'kentwood-child-main',
        get_stylesheet_directory_uri() . '/scss/main.css',
        [ 'kentwood-parent' ],
        filemtime( get_stylesheet_directory() . '/scss/main.css' )
    );

    // 3) JS: nav-home
    wp_enqueue_script(
        'kentwood-child-nav',
        get_stylesheet_directory_uri() . '/assets/js/nav-home.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/nav-home.js' ),
        true
    );

    // 4) JS: blog autoscroll
    wp_enqueue_script(
        'kentwood-blog-scroll',
        get_stylesheet_directory_uri() . '/assets/js/blog-autoscroll.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/blog-autoscroll.js' ),
        true
    );

    // 5) JS: stock ticker
    wp_enqueue_script(
        'kentwood-stock-ticker',
        get_stylesheet_directory_uri() . '/assets/js/stock-ticker.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/stock-ticker.js' ),
        true
    );

}, 10 );

// ✅ Disable Gutenberg Block CSS and Global Styles
add_action( 'wp_enqueue_scripts', function() {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
}, 20 );