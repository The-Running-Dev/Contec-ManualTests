System.register(['@angular/core', '@angular/common', '../../test-type/test-type.component'], function(exports_1, context_1) {
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
    var core_1, common_1, test_type_component_1;
    var CUSTOM_VALUE_ACCESSOR, TestTypeValueAccessor;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (test_type_component_1_1) {
                test_type_component_1 = test_type_component_1_1;
            }],
        execute: function() {
            CUSTOM_VALUE_ACCESSOR = new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                useExisting: core_1.forwardRef(function () { return TestTypeValueAccessor; }),
                multi: true
            });
            TestTypeValueAccessor = (function () {
                function TestTypeValueAccessor(_host) {
                    this._host = _host;
                    this.onChange = function (_) { };
                    this.onTouched = function () { };
                }
                TestTypeValueAccessor.prototype.writeValue = function (value) {
                    this._host.setValue(value);
                };
                TestTypeValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
                TestTypeValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
                TestTypeValueAccessor = __decorate([
                    core_1.Directive({
                        selector: 'test-type',
                        host: { '(change)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                        providers: [CUSTOM_VALUE_ACCESSOR]
                    }), 
                    __metadata('design:paramtypes', [test_type_component_1.TestTypeComponent])
                ], TestTypeValueAccessor);
                return TestTypeValueAccessor;
            }());
            exports_1("TestTypeValueAccessor", TestTypeValueAccessor);
        }
    }
});

//# sourceMappingURL=test-type.value-accessor.js.map
