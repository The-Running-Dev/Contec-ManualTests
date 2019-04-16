System.register(['@angular/core', '@angular/router-deprecated', 'primeng/primeng', '../shared/pipes/date-time-format.pipe', '../shared/index', '../shared/models/index', '../operator-info/operator-info.component', '../unit-info/unit-info.component', '../shared/loading-container'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, primeng_1, date_time_format_pipe_1, index_1, index_2, operator_info_component_1, unit_info_component_1, loading_container_1;
    var TestActivityComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (primeng_1_1) {
                primeng_1 = primeng_1_1;
            },
            function (date_time_format_pipe_1_1) {
                date_time_format_pipe_1 = date_time_format_pipe_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (operator_info_component_1_1) {
                operator_info_component_1 = operator_info_component_1_1;
            },
            function (unit_info_component_1_1) {
                unit_info_component_1 = unit_info_component_1_1;
            },
            function (loading_container_1_1) {
                loading_container_1 = loading_container_1_1;
            }],
        execute: function() {
            TestActivityComponent = (function (_super) {
                __extends(TestActivityComponent, _super);
                function TestActivityComponent(Service, _routeParams) {
                    _super.call(this, true);
                    this.Service = Service;
                    this._routeParams = _routeParams;
                    this.TestResults = [];
                    this.TestResultKeys = [];
                    this.ApiResponse = new index_2.ApiResponse();
                }
                TestActivityComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.Model = this.Service.ManualTest;
                    var id = +this._routeParams.get('id');
                    if (id) {
                        this.Service.LoadUnitInfo(id).subscribe(function (data) {
                            _this.Model = data;
                            _this.Service.GetTestActivity(id).subscribe(function (response) {
                                _this.TestResults = response.Data.TestResults;
                                _this.TestResultKeys = response.Data.TestResultKeys;
                                _this.Service.Status.IsProcessing = false;
                                _this.Ready();
                            });
                        });
                    }
                    else {
                        this.Service.GoToDone();
                    }
                };
                TestActivityComponent.prototype.DeleteTestResult = function (confirmed, item) {
                    var _this = this;
                    if (!confirmed) {
                        setTimeout(function () {
                            item.ConfirmDelete = !item.ConfirmDelete;
                        }, 2000);
                        return;
                    }
                    this.Service.DeleteTestResult(item.ID).subscribe(function (response) {
                        _this.ApiResponse = response;
                        if (!_this.ApiResponse.IsError) {
                            var testResultKeys_1 = [];
                            _this.TestResults.splice(_this.TestResults.indexOf(item), 1);
                            _this.TestResultKeys.forEach(function (key) {
                                if (key.TestId != item.ID) {
                                    testResultKeys_1.push(key);
                                }
                            });
                            _this.TestResultKeys = testResultKeys_1;
                        }
                    });
                };
                TestActivityComponent.prototype.DeleteTestResultKey = function (confirmed, item) {
                    var _this = this;
                    if (!confirmed) {
                        setTimeout(function () {
                            item.ConfirmDelete = !item.ConfirmDelete;
                        }, 2000);
                        return;
                    }
                    this.Service.DeleteTestResultKey(item.TestId).subscribe(function (response) {
                        _this.ApiResponse = response;
                        if (!_this.ApiResponse.IsError) {
                            _this.TestResultKeys.splice(_this.TestResultKeys.indexOf(item), 1);
                        }
                    });
                };
                TestActivityComponent = __decorate([
                    core_1.Component({
                        selector: 'test-activity',
                        templateUrl: 'app/test-activity/test-activity.component.html',
                        styleUrls: [
                            'app/test-activity/test-activity.component.css'
                        ],
                        directives: [
                            loading_container_1.LoadingContainer,
                            operator_info_component_1.OperatorInfoComponent, unit_info_component_1.UnitInfoComponent,
                            primeng_1.DataTable, primeng_1.Column, primeng_1.ToggleButton
                        ],
                        pipes: [
                            date_time_format_pipe_1.DateTimeFormat
                        ],
                        encapsulation: core_1.ViewEncapsulation.None
                    }), 
                    __metadata('design:paramtypes', [index_1.AppService, router_deprecated_1.RouteParams])
                ], TestActivityComponent);
                return TestActivityComponent;
            }(loading_container_1.LoadingPage));
            exports_1("TestActivityComponent", TestActivityComponent);
        }
    }
});

//# sourceMappingURL=test-activity.component.js.map
