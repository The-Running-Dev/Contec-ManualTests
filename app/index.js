System.register(['./app.config', './dashboard/dashboard.component', './single-test/single-test.component', './test-activity/test-activity.component', './batch-test/batch-test.component', './test-type/test-type.component', './unit-info/unit-info.component'], function(exports_1, context_1) {
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
            function (app_config_1_1) {
                exportStar_1(app_config_1_1);
            },
            function (dashboard_component_1_1) {
                exportStar_1(dashboard_component_1_1);
            },
            function (single_test_component_1_1) {
                exportStar_1(single_test_component_1_1);
            },
            function (test_activity_component_1_1) {
                exportStar_1(test_activity_component_1_1);
            },
            function (batch_test_component_1_1) {
                exportStar_1(batch_test_component_1_1);
            },
            function (test_type_component_1_1) {
                exportStar_1(test_type_component_1_1);
            },
            function (unit_info_component_1_1) {
                exportStar_1(unit_info_component_1_1);
            }],
        execute: function() {
        }
    }
});

//# sourceMappingURL=index.js.map
