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
    var core_1, router_deprecated_1, common_1, index_1, operator_info_component_1, test_type_component_1, unit_info_component_1, loading_container_1, index_2;
    var BatchTestComponent;
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
                index_2 = index_1_1;
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
            BatchTestComponent = (function (_super) {
                __extends(BatchTestComponent, _super);
                function BatchTestComponent(Service, _routeParams, _formBuilder) {
                    var _this = this;
                    _super.call(this, true);
                    this.Service = Service;
                    this._routeParams = _routeParams;
                    this._formBuilder = _formBuilder;
                    this._passButtonDefaultText = 'Pass';
                    this._failButtonDefaultText = 'Fail';
                    this.PassButtonText = this._passButtonDefaultText;
                    this.FailButtonText = this._failButtonDefaultText;
                    this.HideForm = true;
                    this.ManualTestForm = _formBuilder.group({
                        serialNumber: [''],
                        testType: [''],
                        quantity: ['']
                    });
                    this.Service.Error$.subscribe(function () {
                        _this.Setup();
                    });
                }
                BatchTestComponent.prototype.Setup = function () {
                    this.PassButtonText = this._passButtonDefaultText;
                    this.FailButtonText = this._failButtonDefaultText;
                    this.Ready();
                };
                BatchTestComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.Model = this.Service.ManualTest;
                    var id = +this._routeParams.get('id');
                    if (id) {
                        this.Service.LoadUnitInfo(id).subscribe(function (data) {
                            _this.Model = data;
                            _this.HideForm = data.Error.IsError || data.BatchTestError.IsError;
                            if (data.BatchTestError.IsError) {
                                _this.Service.EmitError(data.BatchTestError.Message);
                            }
                            _this.Ready();
                        });
                    }
                    else {
                        this.Service.GoToDone();
                    }
                };
                BatchTestComponent.prototype.Quaantity_OnKeyUp = function (value) {
                    if (value === '') {
                        this.Model.Quantity = 1;
                    }
                };
                BatchTestComponent.prototype.Save = function () {
                    var _this = this;
                    this.Service.ClearError();
                    // Hack: Give the model a second to update
                    setTimeout(function () {
                        if (_this.Model.TestResult == index_2.TestResultType.Passed) {
                            _this.PassButtonText = 'Saving...';
                        }
                        else {
                            _this.FailButtonText = 'Saving...';
                        }
                        _this.Service.SaveTestResult().subscribe(function () {
                            // Increment the number passed or number failed
                            if (_this.Model.TestResult == index_2.TestResultType.Passed) {
                                _this.Model.NumberPassed += +_this.Model.Quantity;
                            }
                            else {
                                _this.Model.NumberFailed += +_this.Model.Quantity;
                            }
                            // If the sum of passed and failed tests
                            // is the same as the inventory quantity,
                            // no more batch tests are allowed
                            if ((_this.Model.NumberPassed + _this.Model.NumberFailed)
                                == _this.Model.UnitInfo.InventoryQuantity) {
                                _this.Model.UnitInfo.AllowBatchTest = false;
                                _this.Service.EmitError(_this.Service.BatchTestLimitReached);
                                _this.HideForm = true;
                            }
                            // Reset the serial number, the quantity and set focus to the field
                            _this.Model.SerialNumber = '';
                            _this.Model.Quantity = 1;
                            _this.serialNumberFocus.setFocus();
                            _this.PassButtonText = _this._passButtonDefaultText;
                            _this.FailButtonText = _this._failButtonDefaultText;
                        });
                    }, 500);
                };
                BatchTestComponent.prototype.isFormEnabled = function () {
                    return !this.Service.Status.IsProcessing && this.ManualTestForm.valid;
                };
                __decorate([
                    core_1.ViewChild(index_1.FocusElement), 
                    __metadata('design:type', index_1.FocusElement)
                ], BatchTestComponent.prototype, "serialNumberFocus", void 0);
                BatchTestComponent = __decorate([
                    core_1.Component({
                        selector: 'test-batch',
                        templateUrl: 'app/batch-test/batch-test.component.html',
                        styleUrls: [
                            'app/batch-test/batch-test.component.css'
                        ],
                        directives: [
                            loading_container_1.LoadingContainer,
                            operator_info_component_1.OperatorInfoComponent,
                            test_type_component_1.TestTypeComponent, unit_info_component_1.UnitInfoComponent,
                            index_1.FocusElement, index_1.ButtonRadioDirective, index_1.TestTypeValueAccessor
                        ]
                    }), 
                    __metadata('design:paramtypes', [index_1.AppService, router_deprecated_1.RouteParams, common_1.FormBuilder])
                ], BatchTestComponent);
                return BatchTestComponent;
            }(loading_container_1.LoadingPage));
            exports_1("BatchTestComponent", BatchTestComponent);
        }
    }
});

//# sourceMappingURL=batch-test.component.js.map
