System.register(['@angular/platform-browser-dynamic', '@angular/core', './app.config', './app.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var platform_browser_dynamic_1, core_1, app_config_1, app_component_1;
    function Run(appConfig) {
        // If config was provided, overwrite the defaults
        if (appConfig) {
            // Copy the configuration over the default configuration
            copyConfiguration(appConfig, new app_config_1.AppConfig()).then(function (config) {
                if (config.ProductionMode) {
                    core_1.enableProdMode();
                }
                startApplication(config);
            });
        }
        else {
            startApplication(new app_config_1.AppConfig());
        }
    }
    exports_1("Run", Run);
    function startApplication(appConfig) {
        platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
            core_1.provide('app.config', { useValue: appConfig })
        ]).then(function (success) {
        }).catch(function (error) { return console.log(error); });
    }
    function copyConfiguration(source, destination) {
        return new Promise(function (resolve) {
            Object.keys(source).forEach(function (key) {
                if (typeof (source[key]) === 'object') {
                    return copyConfiguration(source[key], destination[key]);
                }
                destination[key] = source[key];
                resolve(destination);
            });
        });
    }
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=main.js.map
