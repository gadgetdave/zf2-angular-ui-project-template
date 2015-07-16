/**
 * Model 'class' for use with CrudControllerService
 */
var Model = function () {}
Model.prototype.isValid = function () {
    return true;
};
//add service to angular app
app.service('Model', Model);
/**
 * ControllerService 'class' for use with back end controllers that don't
 * require crud functionality
 */
var ControllerService = function () {
    this.viewConfig = {};
    this.title = '';
};
ControllerService.prototype = {
    /**
     * init method - this is used to initialise
     * the Object.
     * 
     * @return void
     */
    init : function () {
        this.setViewConfig(VIEW_DATA);
    },
    
    /**
     * populate the internal properties
     * from the passed object
     * 
     * @param {Object} variables
     * @return void
     */
    populateProperties : function (variables) {
        for (var prop in variables) {
            if (variables.hasOwnProperty(prop)) {
                this[prop] = variables[prop];
            }
        }
    },
    
    /**
     * setter for viewConfig
     * 
     * @param {Object} vConfig
     * @return void
     */
    setViewConfig : function (vConfig) {
        if (!vConfig) {
            return;
        }
        
        this.viewConfig = vConfig;
        this.populateProperties(vConfig);
    },
    
    /**
     * getter for internal property
     * 
     * @return String
     */
    getTitle : function () {
        return this.title;
    }
};
//add service to angular app
app.service('ControllerService', ControllerService);

var CrudControllerService = function () {
    // call the super constructor
    ControllerService.call(this);

    this.model = new Model();
    this.getItemsUrl = '';
    this.items;
};

// inherit from ControllerService
CrudControllerService.prototype = Object.create(ControllerService.prototype);
var methodsToAdd = {
    /**
     * getter for internal property
     * 
     * @return {Object}
     */
    getModel : function () {
        return this.model;
    },
    
    /**
     * setter for internal property
     * 
     * @param {Object} model
     * @return void
     */
    setModel : function (model) {
        this.model = model;
    },
    testIsValid : function (test) {
        console.log(this.model.isValid(test));
    },
    
    /**
     * getter for internal property items
     * 
     * @param boolean 
     * @return {Array}
     */
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
// for the given object lets add the properties to the CrudController prototype
// this is a bit cleaner than multiple lines of single property assignment
for (var prop in methodsToAdd) {
    CrudControllerService.prototype[prop] = methodsToAdd[prop];
}
// add service to angular app
app.service('CrudControllerService', CrudControllerService);