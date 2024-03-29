System.register(['@angular/core', '../shared/services/app.service'], function(exports_1, context_1) {
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
    var core_1, app_service_1;
    var TestTypeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            TestTypeComponent = (function () {
                function TestTypeComponent(_service) {
                    this._service = _service;
                }
                TestTypeComponent.prototype.ngOnInit = function () {
                };
                TestTypeComponent.prototype.getTestTypes = function () {
                    return this._service.GetTestTypes();
                };
                TestTypeComponent.prototype.setValue = function (value) {
                    this.TestType = value;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], TestTypeComponent.prototype, "IsEnabled", void 0);
                TestTypeComponent = __decorate([
                    core_1.Component({
                        selector: 'test-type',
                        templateUrl: 'app/test-type/test-type.component.html'
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], TestTypeComponent);
                return TestTypeComponent;
            }());
            exports_1("TestTypeComponent", TestTypeComponent);
        }
    }
});

//# sourceMappingURL=test-type.component.js.map
