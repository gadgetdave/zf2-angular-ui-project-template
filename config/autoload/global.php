<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */

return array(
    'assetic_configuration' => array(
        'debug' => true,
        'buildOnRequest' => true,

        'webPath' => realpath('public/assets'),
        'basePath' => 'assets',

        'routes' => array(
            'home' => array(
                '@base_js',
                '@app',
                '@base_css',
            ),

            'Admin' => array(
                '@base_js',
                '@admin_js',
                '@base_css',
                '@admin_css'
            ),

            'admin_example' => array(
                '@base_js',
                '@admin_js',
                '@base_css',
                '@admin_css'
            ),
        ),

        'modules' => array(
            'Application' => array(
                'root_path' => __DIR__ . '/../../module/Application/assets',
                'collections' => array(
                    'base_css' => array(
                        'assets' => array(
                            'css/bootstrap-theme.min.css',
                            'css/style.css',
                            'css/bootstrap.min.css'
                        ),
                        'filters' => array(
                            'CssRewriteFilter' => array(
                                'name' => 'Assetic\Filter\CssRewriteFilter'
                            )
                        ),
                    ),

                    'app' => array(
                        'assets' => array(
                            'js/app.js',
                        )
                    ),
                    
                    'base_js' => array(
                        'assets' => array(
                            'js/SpaceName.js',
//                             'js/MyApp.js',
                            'js/html5shiv.min.js',
                        )
                    ),

                    'base_images' => array(
                        'assets' => array(
                            'img/*.png',
                            'img/*.ico',
                        ),
                        'options' => array(
                            'move_raw' => true,
                        )
                    ),

                    'base_views' => array(
                        'assets' => array(
                            'views/*.html',
                            'views/partials/*.html'
                        ),
                        'options' => array(
                            'move_raw' => true,
                        )
                    ),
                ),
            ),
            'Admin' => array(
                'root_path' => __DIR__ . '/../../module/Admin/assets',
                
                'collections' => array(
                    'admin_css' => array(
                        'assets' => array(
                            'css/admin.css',
                        ),
                        'filters' => array(
                            '?CssRewriteFilter' => array(
                                'name' => 'Assetic\Filter\CssRewriteFilter'
                            ),
                            '?CssMinFilter' => array(
                                'name' => 'Assetic\Filter\CssMinFilter'
                            ),
                        ),
                    ),
                    'admin_js' => array(
                        'assets' => array(
                            'js/app.js',
                            'js/services.js',
                            'js/controllers/*.js'
                        ),
                        'filters' => array(
                            '?JSMinFilter' => array(
                                'name' => 'Assetic\Filter\JSMinFilter'
                            ),
                        ),
                    ),
                    /* 'app_admin' => array(
                        'assets' => array(

                        )
                    ), */
                    'admin_views' => array(
                        'assets' => array(
                            'views/*.html',
                            'views/partials/*.html'
                        ),
                        'options' => array(
                            'move_raw' => true,
                        )
                    ),
                ),
            ),
        ),
    ),
);
