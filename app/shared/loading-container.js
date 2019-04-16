System.register(['@angular/core', '@angular/common'], function(exports_1, context_1) {
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
    var core_1, common_1;
    var LoadingContainer, LoadingPage;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            }],
        execute: function() {
            LoadingContainer = (function () {
                function LoadingContainer() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], LoadingContainer.prototype, "loading", void 0);
                LoadingContainer = __decorate([
                    core_1.Component({
                        selector: 'loading-container',
                        templateUrl: 'app/shared/loading-container.html',
                        directives: [common_1.NgSwitch, common_1.NgSwitchWhen]
                    }), 
                    __metadata('design:paramtypes', [])
                ], LoadingContainer);
                return LoadingContainer;
            }());
            exports_1("LoadingContainer", LoadingContainer);
            LoadingPage = (function () {
                function LoadingPage(_val) {
                    this._val = _val;
                    this.loading = _val;
                }
                LoadingPage.prototype.Standby = function () {
                    this.loading = true;
                };
                LoadingPage.prototype.Ready = function () {
                    this.loading = false;
                };
                return LoadingPage;
            }());
            exports_1("LoadingPage", LoadingPage);
        }
    }
});

//# sourceMappingURL=loading-container.js.map
