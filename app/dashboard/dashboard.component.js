System.register(['@angular/core', '@angular/common', 'primeng/primeng', '../shared/index', '../error-handler/index'], function(exports_1, context_1) {
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
    var core_1, common_1, primeng_1, index_1, index_2;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(Service, formBuilder) {
                    this.Service = Service;
                    this.formBuilder = formBuilder;
                    this.SearchForm = formBuilder.group({
                        TrackingId: new common_1.Control('')
                    });
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.Service.Error$.subscribe(function () {
                        setTimeout(function () {
                            _this.TrackingIdFocus.setFocus();
                        }, 100);
                    });
                };
                DashboardComponent.prototype.OnEnableDiagnostics_Changed = function (event) {
                    this.Service.Setup();
                    this.TrackingIdFocus.setFocus();
                };
                DashboardComponent.prototype.IsTrackingIdValid = function (trackingIdControl) {
                    return !trackingIdControl.valid && !trackingIdControl.pristine && trackingIdControl.value !== '';
                };
                DashboardComponent.prototype.OnKeyUpEnter = function (trackingIdControl) {
                    if (trackingIdControl.valid) {
                        this.Service.GoToTests(trackingIdControl.value);
                    }
                };
                __decorate([
                    core_1.ViewChild(index_1.FocusElement), 
                    __metadata('design:type', index_1.FocusElement)
                ], DashboardComponent.prototype, "TrackingIdFocus", void 0);
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: 'app/dashboard/dashboard.component.html',
                        styleUrls: [
                            'app/dashboard/dashboard.component.css'
                        ],
                        directives: [
                            index_2.ErrorHandlerComponent, index_1.FocusElement,
                            common_1.FORM_DIRECTIVES, primeng_1.InputSwitch,
                        ]
                    }), 
                    __metadata('design:paramtypes', [index_1.AppService, common_1.FormBuilder])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});

//# sourceMappingURL=dashboard.component.js.map
