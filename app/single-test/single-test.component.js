System.register(['@angular/core', '@angular/router-deprecated', '@angular/common', '../shared/index', '../operator-info/operator-info.component', '../test-type/test-type.component', '../unit-info/unit-info.component', '../shared/loading-container'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, common_1, index_1, operator_info_component_1, test_type_component_1, unit_info_component_1, loading_container_1;
    var SingleTestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (operator_info_component_1_1) {
                operator_info_component_1 = operator_info_component_1_1;
            },
            function (test_type_component_1_1) {
                test_type_component_1 = test_type_component_1_1;
            },
            function (unit_info_component_1_1) {
                unit_info_component_1 = unit_info_component_1_1;
            },
            function (loading_container_1_1) {
                loading_container_1 = loading_container_1_1;
            }],
        execute: function() {
            SingleTestComponent = (function (_super) {
                __extends(SingleTestComponent, _super);
                function SingleTestComponent(Service, _routeParams, _formBuilder) {
                    var _this = this;
                    _super.call(this, true);
                    this.Service = Service;
                    this._routeParams = _routeParams;
                    this._formBuilder = _formBuilder;
                    this.SaveButtonText = 'Save';
                    this.HideForm = true;
                    this.ManualTestForm = _formBuilder.group({
                        ErrorCode: [''],
                        ErrorMessage: [''],
                        TestType: ['']
                    });
                    this.Service.Error$.subscribe(function () {
                        _this.Ready();
                    });
                }
                SingleTestComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.Model = this.Service.ManualTest;
                    var id = +this._routeParams.get('id');
                    if (id) {
                        this.Service.LoadUnitInfo(id).subscribe(function (data) {
                            _this.Model = data;
                            _this.HideForm = data.Error.IsError || data.SingleTestError.IsError;
                            if (data.SingleTestError.IsError) {
                                _this.Service.EmitError(data.SingleTestError.Message);
                            }
                            _this.Ready();
                        });
                    }
                    else {
                        this.Service.GoToDone();
                    }
                };
                SingleTestComponent.prototype.Save = function () {
                    var _this = this;
                    this.Service.ClearError();
                    this.SaveButtonText = 'Saving...';
                    this.Service.SaveTestResult().subscribe(function () {
                        _this.SaveButtonText = 'Saved';
                        if (_this.Service.IsActivityEnabled()) {
                            _this.Service.GoToActivity(_this.Model.UnitInfo.TrackingId);
                        }
                        else {
                            _this.Service.GoToDone();
                        }
                    });
                };
                SingleTestComponent.prototype.isFormEnabled = function () {
                    return !this.Service.Status.IsProcessing
                        && this.ManualTestForm.valid
                        && this.Model.TestResult != null;
                };
                SingleTestComponent = __decorate([
                    core_1.Component({
                        selector: 'single-test',
                        templateUrl: 'app/single-test/single-test.component.html',
                        styleUrls: [
                            'app/single-test/single-test.component.css'
                        ],
                        directives: [
                            loading_container_1.LoadingContainer,
                            operator_info_component_1.OperatorInfoComponent,
                            test_type_component_1.TestTypeComponent, unit_info_component_1.UnitInfoComponent,
                            index_1.ButtonRadioDirective, index_1.TestTypeValueAccessor, index_1.FocusElement
                        ]
                    }), 
                    __metadata('design:paramtypes', [index_1.AppService, router_deprecated_1.RouteParams, common_1.FormBuilder])
                ], SingleTestComponent);
                return SingleTestComponent;
            }(loading_container_1.LoadingPage));
            exports_1("SingleTestComponent", SingleTestComponent);
        }
    }
});

//# sourceMappingURL=single-test.component.js.map
