System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ErrorHandler;
    return {
        setters:[],
        execute: function() {
            ErrorHandler = (function () {
                function ErrorHandler(isError, message) {
                    this.IsError = isError;
                    this.Message = message;
                }
                return ErrorHandler;
            }());
            exports_1("ErrorHandler", ErrorHandler);
        }
    }
});

//# sourceMappingURL=error-handler.model.js.map
