<?php
/**
 * Kentwood Child Theme functions
 */

// Load parent + child theme styles + scripts
add_action( 'wp_enqueue_scripts', function() {
    // ✅ Load parent theme stylesheet
    wp_enqueue_style(
        'kentwood-parent',
        get_template_directory_uri() . '/style.css',
        [],
        wp_get_theme( get_template() )->get( 'Version' )
    );

    // ✅ Load child theme compiled main.css WITH HIGHER PRIORITY
    wp_enqueue_style(
        'kentwood-child-main',
        get_stylesheet_directory_uri() . '/scss/main.css',
        [ 'kentwood-parent' ],
        filemtime( get_stylesheet_directory() . '/scss/main.css' )
    );

    // ✅ Load block library (restores block editor base styling)
    wp_enqueue_style( 'wp-block-library' );

    // ✅ Load global styles if theme.json exists
    if ( function_exists( 'wp_get_global_stylesheet' ) ) {
        wp_enqueue_style(
            'global-styles',
            add_query_arg( 'ver', wp_get_theme()->get( 'Version' ), get_theme_file_uri( 'style.css' ) )
        );
    }

    // ✅ JS: nav-home
    wp_enqueue_script(
        'kentwood-child-nav',
        get_stylesheet_directory_uri() . '/assets/js/nav-home.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/nav-home.js' ),
        true
    );

    // ✅ JS: blog-autoscroll
    wp_enqueue_script(
        'kentwood-blog-scroll',
        get_stylesheet_directory_uri() . '/assets/js/blog-autoscroll.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/blog-autoscroll.js' ),
        true
    );

    // ✅ JS: stock ticker
    wp_enqueue_script(
        'kentwood-stock-ticker',
        get_stylesheet_directory_uri() . '/assets/js/stock-ticker.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/stock-ticker.js' ),
        true
    );

    // ✅ JS: experience carousel
    wp_enqueue_script(
        'kentwood-experience-carousel',
        get_stylesheet_directory_uri() . '/assets/js/experience-carousel.js',
        [],
        filemtime( get_stylesheet_directory() . '/assets/js/experience-carousel.js' ),
        true
    );

    // ✅ JS: timeline animations - TEMPORARILY DISABLED
    /*
    $timeline_js_path = get_stylesheet_directory() . '/assets/js/timeline.js';
    if (file_exists($timeline_js_path)) {
        wp_enqueue_script(
            'kentwood-timeline',
            get_stylesheet_directory_uri() . '/assets/js/timeline.js',
            [],
            filemtime($timeline_js_path),
            true
        );
    } else {
        error_log('Timeline JS file not found at: ' . $timeline_js_path);
    }
    */
});

// NUCLEAR CSS OVERRIDE - Add inline styles to force timeline visibility
add_action('wp_head', function() {
    echo '<style>
        /* NUCLEAR TIMELINE OVERRIDES */
        .timeline-item,
        .wp-block-group.timeline-item {
            background: #ffffff !important;
            opacity: 1 !important;
            visibility: visible !important;
            filter: none !important;
        }
        
        .timeline-content {
            background: #ffffff !important;
            opacity: 1 !important;
            visibility: visible !important;
            filter: none !important;
        }
        
        .timeline-year {
            background: #87CEEB !important;
            opacity: 1 !important;
            visibility: visible !important;
            z-index: 9999 !important;
            filter: none !important;
            display: block !important;
        }
        
        .timeline-title,
        .timeline-description,
        .timeline-links,
        .timeline-media,
        .timeline-item h3,
        .timeline-item p,
        .timeline-item a,
        .timeline-item img {
            opacity: 1 !important;
            visibility: visible !important;
            filter: none !important;
        }
    </style>';
});