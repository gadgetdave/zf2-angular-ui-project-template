'use strict';

angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/user");
    
    $stateProvider.state(
        "index",
        {
            url: "/user",
            templateUrl: "/assets/views/grid.html"
        }
    )
    .state(
        "create",
        {
            url: "/user/create",
            templateUrl: 'create'
        }
    )
    .state(
        "edit",
        {
            url: "/user/edit",
            templateUrl: 'edit'
        }
    )
    .state(
        "delete",
        {
            url: "/user/delete",
            templateUrl: 'delete'
        }
    );
});