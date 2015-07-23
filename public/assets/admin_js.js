'use strict';

var app = angular.module(
    'myApp',
    [
        'ui.bootstrap', 
        'ui.router',
        'ui.grid',
        'ngTable',
        'angular-loading-bar',
        'ngResource',
        'myApp.services'
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

angular.module('myApp.services', []).factory('Example', function($resource) {
    return $resource('/admin/example/:exampleId', { id: '@_exampleId' }, {
      update: {
        method: 'PUT'
      }
    });
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
    function($scope, $state, $stateParams, Example) {
        $scope.updateExample = function() { //Update the edited movie. Issues a PUT to /api/movies/:id
          $scope.example.$update(function() {
            $state.go('index'); // on success go back to home i.e. movies state.
          });
        };
       
        $scope.loadExample = function() { //Issues a GET request to /api/movies/:id to get a movie to update
          $scope.example = Example.get({ exampleId: $stateParams.exampleId });
        };
       
        $scope.loadExample(); // Load a movie which can be edited on UI
      });

'use strict';

app
.controller(
    "dashboardController",
    function($scope, ControllerService) {
        
        ControllerService.init();
        
        $scope.title = ControllerService.getTitle();
    }
);

