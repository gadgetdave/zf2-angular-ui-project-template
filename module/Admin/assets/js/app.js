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
        stateConfig = VIEW_DATA.state.config;
    
    $urlRouterProvider.otherwise(otherwiseUrl);
    
    // here we are adding the routes that we have 
    // passed from the back end in VIEW_DATA
    for (var prop in stateConfig) {
        if (stateConfig.hasOwnProperty(prop)) {
            $stateProvider.state(
                prop,
                stateConfig[prop]
            );
        }
    }
});