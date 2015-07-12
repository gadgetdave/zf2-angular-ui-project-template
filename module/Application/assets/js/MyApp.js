'use strict';
var MyApp = (function () {
    var controllerConfig;
    
    // Controller 'class'
    function Controller() {}
    Controller.prototype.config = {};
    Controller.prototype.model = '';
    Controller.prototype.getItemsUrl = '';
    Controller.prototype.title = '';
    Controller.prototype.populateVariables = function (variables) {
        for (var prop in variables) {
            if (variables.hasOwnProperty(prop)) {
                this[prop] = variables[prop];
            }
        }
    };
    Controller.prototype.setConfig = function (config) {
        this.config = config;
        this.populateVariables(config);
    };
    
    return {
        getControllerConfig: function () {
            return controllerConfig;
        },
        
        setControllerConfig: function (config) {
            if (!controllerConfig) {
                controllerConfig = new Controller();
            }
            
            controllerConfig.setConfig(config);
        },
        
        // I control the main demo.
        itemControllerMethod: function( $scope, itemService ) {
            
            // I contain the list of friends to be rendered.
            $scope.items = [];
            $scope.title = controllerConfig.title;

            loadRemoteData();

            // I apply the remote data to the local scope.
            function applyRemoteData( newItems ) {
                $scope.items = newItems.items;
            }

            // I load the remote data from the server.
            function loadRemoteData() {

                // The friendService returns a promise.
                itemService.getItems()
                    .then(
                        function( items ) {
                            applyRemoteData( items );
                        }
                    )
                ;
            }
        },
        
        itemService: function( $http, $q ) {

            // Return public API.
            return({
                getItems: getItems
            });


            // ---
            // PUBLIC METHODS.
            // ---

            // I get all of the friends in the remote collection.
            function getItems() {

                var request = $http({
                    method: "get",
                    url: controllerConfig.getItemsUrl
                });

                return( request.then( handleSuccess, handleError ) );
            }

            // ---
            // PRIVATE METHODS.
            // ---


            // I transform the error response, unwrapping the application dta from
            // the API response payload.
            function handleError( response ) {
                // The API response from the server should be returned in a
                // nomralized format. However, if the request was not handled by the
                // server (or what not handles properly - ex. server error), then we
                // may have to normalize it on our end, as best we can.
                if (
                    ! angular.isObject( response.data ) ||
                    ! response.data.message
                    ) {

                    return( $q.reject( "An unknown error occurred." ) );

                }

                // Otherwise, use expected error message.
                return( $q.reject( response.data.message ) );
            }

            // I transform the successful response, unwrapping the application data
            // from the API response payload.
            function handleSuccess( response ) {
                return( response.data );
            }
        }
    };
}());