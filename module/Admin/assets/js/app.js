'use strict';

var app = angular.module(
    'myApp',
    [
        'ui.bootstrap', 
        'ui.router',
        'ui.grid',
        'ngTable',
        'angular-loading-bar'
    ]
)
.config(function ($stateProvider, $urlRouterProvider) {

    var otherwiseUrl = VIEW_DATA.state.otherwiseUrl || "/",
        stateRoutes = VIEW_DATA.state.routes;
    
    $urlRouterProvider.otherwise(otherwiseUrl);
    
    // here we are adding the routes that we have 
    // passed from the back end in VIEW_DATA
    for (var prop in stateRoutes) {
        if (stateRoutes.hasOwnProperty(prop)) {
            $stateProvider.state(
                prop,
                stateRoutes[prop]
            );
        }
    }
});