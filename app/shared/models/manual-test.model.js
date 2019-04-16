System.register(['../../error-handler/error-handler.model', './operator-info.model', './unit-info.model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var error_handler_model_1, operator_info_model_1, unit_info_model_1;
    var ManualTest;
    return {
        setters:[
            function (error_handler_model_1_1) {
                error_handler_model_1 = error_handler_model_1_1;
            },
            function (operator_info_model_1_1) {
                operator_info_model_1 = operator_info_model_1_1;
            },
            function (unit_info_model_1_1) {
                unit_info_model_1 = unit_info_model_1_1;
            }],
        execute: function() {
            ManualTest = (function () {
                function ManualTest() {
                    this.Error = new error_handler_model_1.ErrorHandler();
                    this.SingleTestError = new error_handler_model_1.ErrorHandler();
                    this.BatchTestError = new error_handler_model_1.ErrorHandler();
                    this.OperatorInfo = new operator_info_model_1.OperatorInfo();
                    this.UnitInfo = new unit_info_model_1.UnitInfo();
                    this.Quantity = 1;
                    this.NumberFailed = 0;
                    this.NumberPassed = 0;
                }
                return ManualTest;
            }());
            exports_1("ManualTest", ManualTest);
        }
    }
});

//# sourceMappingURL=manual-test.model.js.map
