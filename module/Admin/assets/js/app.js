'use strict';

// Declare app level module which depends on filters, and services
angular.module(
    'myApp',
    [
        'ui.bootstrap', 
        'ui.router',
        'ui.grid',
        'ngTable'
    ]
);

angular.module('myApp')
    .controller(
        "itemController",
        MyApp.itemControllerMethod
    )
    .service(
        "itemService",
        MyApp.itemService
);