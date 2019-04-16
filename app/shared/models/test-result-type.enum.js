System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TestResultType;
    return {
        setters:[],
        execute: function() {
            (function (TestResultType) {
                TestResultType[TestResultType["Passed"] = 1] = "Passed";
                TestResultType[TestResultType["Failed"] = 2] = "Failed";
            })(TestResultType || (TestResultType = {}));
            exports_1("TestResultType", TestResultType);
        }
    }
});

//# sourceMappingURL=test-result-type.enum.js.map
