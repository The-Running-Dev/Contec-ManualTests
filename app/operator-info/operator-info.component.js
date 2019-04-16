System.register(['@angular/core', '../shared/index'], function(exports_1, context_1) {
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
    var core_1, index_1;
    var OperatorInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            }],
        execute: function() {
            OperatorInfoComponent = (function () {
                function OperatorInfoComponent() {
                }
                OperatorInfoComponent.prototype.ngOnInit = function () {
                };
                // Subscribe to the change event and update the model
                OperatorInfoComponent.prototype.ngOnChanges = function (changes) {
                    var key = 'Data';
                    this.Model = changes[key].currentValue;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', index_1.OperatorInfo)
                ], OperatorInfoComponent.prototype, "Data", void 0);
                OperatorInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'operator-info',
                        templateUrl: 'app/operator-info/operator-info.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], OperatorInfoComponent);
                return OperatorInfoComponent;
            }());
            exports_1("OperatorInfoComponent", OperatorInfoComponent);
        }
    }
});

//# sourceMappingURL=operator-info.component.js.map
