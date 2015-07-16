'use strict';

// Declare app level module which depends on filters, and services
var app = angular.module(
    'myApp',
    [
        'ui.bootstrap', 
        'ui.router',
        'ui.grid',
        'ngTable'
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
function Model () {}
Model.prototype.isValid = function () {
    return true;
};
app.service('Model', Model);
var ControllerService = function () {
    this.viewConfig = {};
    this.title = '';
};
ControllerService.prototype = {
    init : function () {
        this.setViewConfig(VIEW_DATA);
    },
    populateVariables : function (variables) {
        for (var prop in variables) {
            if (variables.hasOwnProperty(prop)) {
                this[prop] = variables[prop];
            }
        }
    },
    setViewConfig : function (vConfig) {
        if (!vConfig) {
            return;
        }
        
        this.viewConfig = vConfig;
        this.populateVariables(vConfig);
    },
    getTitle : function () {
        return this.title;
    }
};
app.service('ControllerService', ControllerService);
var CrudControllerService = function () {
    // call the super constructor
    ControllerService.call(this);

    this.model = new Model();
    this.getItemsUrl = '';
    this.items;
};

CrudControllerService.prototype = Object.create(ControllerService.prototype);
var methodsToAdd = {
    getModel : function () {
        return Model;
    },
    setModel : function (m) {
        this.model = m;
    },
    testIsValid : function (test) {
        console.log(this.model.isValid(test));
    },
    getItems : function (forceFetch) {
        if (this.items) {
            return this.items;
        }
        
        if (VIEW_DATA) {
            if (VIEW_DATA.items) {
                this.items = VIEW_DATA.items;
            }
        }
        
        return this.items;
    }
}
for (var prop in methodsToAdd) {
    CrudControllerService.prototype[prop] = methodsToAdd[prop];
}
app.service('CrudControllerService', CrudControllerService);
'use strict';

app
.controller(
    "gridController",
    function($scope, CrudControllerService) {
        
        CrudControllerService.init();
        
        function NewModel() {}
        NewModel.prototype = Object.create(Model.prototype);
        NewModel.prototype.isValid = function () {
            return false;
        };
        
        CrudControllerService.setModel(new NewModel());
        
        // I contain the list of friends to be rendered.
        $scope.items = CrudControllerService.getItems();
        $scope.title = CrudControllerService.getTitle();
    }
);


'use strict';

app
.controller(
    "dashboardController",
    function($scope, ControllerService) {
        
        ControllerService.init();
        
        // I contain the list of friends to be rendered.
        $scope.title = ControllerService.getTitle();
    }
);

