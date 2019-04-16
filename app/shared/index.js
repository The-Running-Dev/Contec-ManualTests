System.register(['./accessors/radio-value-accessor', './accessors/test-type.value-accessor', './directives/button-radio.directive', './directives/focus-element.directive', './loading-container', './models/index', './services/app.service', './services/config.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (radio_value_accessor_1_1) {
                exportStar_1(radio_value_accessor_1_1);
            },
            function (test_type_value_accessor_1_1) {
                exportStar_1(test_type_value_accessor_1_1);
            },
            function (button_radio_directive_1_1) {
                exportStar_1(button_radio_directive_1_1);
            },
            function (focus_element_directive_1_1) {
                exportStar_1(focus_element_directive_1_1);
            },
            function (loading_container_1_1) {
                exportStar_1(loading_container_1_1);
            },
            function (index_1_1) {
                exportStar_1(index_1_1);
            },
            function (app_service_1_1) {
                exportStar_1(app_service_1_1);
            },
            function (config_service_1_1) {
                exportStar_1(config_service_1_1);
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=index.js.map
