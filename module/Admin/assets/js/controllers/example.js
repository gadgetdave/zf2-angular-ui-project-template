'use strict';

app
.controller(
    "gridController",
    function($scope, CrudControllerService) {
        
        // first call the init method to setup
        // the service
        CrudControllerService.init();
        
        /*
         * Commented out for testing
         * function NewModel() {}
        NewModel.prototype = Object.create(Model.prototype);
        NewModel.prototype.isValid = function () {
            return false;
        };
        
        CrudControllerService.setModel(new NewModel());*/
        
        // update the scope properties for the ngView
        // from the CrudControllerService
        $scope.gridOptions = CrudControllerService.get('gridOptions') || {};
        $scope.gridOptions.data = CrudControllerService.getItems();
        $scope.title = CrudControllerService.getTitle();
    }
);

