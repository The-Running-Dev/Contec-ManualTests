System.register(['./api-response.model', './manual-test.model', './operator-info.model', './test-result-type.enum', './test-type.model', './unit-info.model'], function(exports_1, context_1) {
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
            function (api_response_model_1_1) {
                exportStar_1(api_response_model_1_1);
            },
            function (manual_test_model_1_1) {
                exportStar_1(manual_test_model_1_1);
            },
            function (operator_info_model_1_1) {
                exportStar_1(operator_info_model_1_1);
            },
            function (test_result_type_enum_1_1) {
                exportStar_1(test_result_type_enum_1_1);
            },
            function (test_type_model_1_1) {
                exportStar_1(test_type_model_1_1);
            },
            function (unit_info_model_1_1) {
                exportStar_1(unit_info_model_1_1);
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=index.js.map
