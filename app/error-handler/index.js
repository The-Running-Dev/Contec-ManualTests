System.register(['./error-handler.component', './error-handler.model'], function(exports_1, context_1) {
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
            function (error_handler_component_1_1) {
                exportStar_1(error_handler_component_1_1);
            },
            function (error_handler_model_1_1) {
                exportStar_1(error_handler_model_1_1);
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=index.js.map
