System.register(['@angular/core', './error-handler.model', '../shared/services/app.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, error_handler_model_1, app_service_1;
    var ErrorHandlerComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (error_handler_model_1_1) {
                error_handler_model_1 = error_handler_model_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            ErrorHandlerComponent = (function () {
                function ErrorHandlerComponent(Service) {
                    var _this = this;
                    this.Service = Service;
                    this.Model = new error_handler_model_1.ErrorHandler();
                    this.Service.Error$.subscribe(function (data) {
                        _this.Model = data;
                    });
                }
                ErrorHandlerComponent = __decorate([
                    core_1.Component({
                        selector: 'error-handler',
                        templateUrl: 'app/error-handler/error-handler.component.html'
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], ErrorHandlerComponent);
                return ErrorHandlerComponent;
            }());
            exports_1("ErrorHandlerComponent", ErrorHandlerComponent);
        }
    }
});

//# sourceMappingURL=error-handler.component.js.map
