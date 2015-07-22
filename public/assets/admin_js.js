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
//add service to angular app
app.service('Model', SpaceName.Model);
app.service('ControllerService', SpaceName.ControllerService);
app.service('CrudControllerService', SpaceName.CrudControllerService);
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
app
.controller(
    "editController",
    function($scope, CrudControllerService, $state) {
        
        $scope.getTemplateUrl = function () {
            return '/admin/example/' + $state.params.exampleId + '/edit';
        };
    }
);


'use strict';

app
.controller(
    "dashboardController",
    function($scope, ControllerService) {
        
        ControllerService.init();
        
        $scope.title = ControllerService.getTitle();
    }
);

