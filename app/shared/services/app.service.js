System.register(['@angular/core', '@angular/http', '@angular/router-deprecated', 'rxjs/Rx', 'rxjs/Subject', './config.service', '../models/index', '../../error-handler/error-handler.model'], function(exports_1, context_1) {
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
    var core_1, http_1, router_deprecated_1, Rx_1, Subject_1, config_service_1, index_1, error_handler_model_1;
    var AppService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (config_service_1_1) {
                config_service_1 = config_service_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (error_handler_model_1_1) {
                error_handler_model_1 = error_handler_model_1_1;
            }],
        execute: function() {
            AppService = (function () {
                function AppService(_http, _router, _configService) {
                    this._http = _http;
                    this._router = _router;
                    this._configService = _configService;
                    this.Status = { IsProcessing: false, Message: '' };
                    this.CannotRecordSingleTests = 'You Cannot Record Single Tests for This Unit';
                    this.CannotRecordBatchTests = 'You Cannot Record Batch Tests for This Unit';
                    this.BatchTestLimitReached = 'You Have Reached the Number of Allowed Tests';
                    this.CannotRecordTests = 'You Cannot Record Tests for This Unit';
                    this.NoDataFoundForTrackingId = 'No Data Found for This Tracking ID';
                    this._unitInfo = new Subject_1.Subject();
                    this._error = new Subject_1.Subject();
                    this.Setup();
                }
                Object.defineProperty(AppService.prototype, "Error$", {
                    get: function () {
                        return this._error.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(AppService.prototype, "UnitInfo$", {
                    get: function () {
                        return this._unitInfo.asObservable();
                    },
                    enumerable: true,
                    configurable: true
                });
                AppService.prototype.Config = function () {
                    return this._configService.AppConfig;
                };
                AppService.prototype.IsTrackingIdValid = function (trackingId) {
                    var _this = this;
                    this.StartProcessing('Validating Tracking ID');
                    return new Promise(function (resolve) {
                        _this.GetUnitInfoByTrackingId(trackingId)
                            .subscribe(function (unitInfo) {
                            _this.Status.IsProcessing = false;
                            if (unitInfo.TrackingId == 0) {
                                // need to return false if not ok
                                resolve({ dataExists: false });
                            }
                            else {
                                _this._unitInfo.next(unitInfo);
                                // need to return null if ok
                                resolve(null);
                            }
                        }, function (error) {
                            _this.Status.IsProcessing = false;
                        });
                    });
                };
                AppService.prototype.Setup = function () {
                    this.ClearError();
                    this.ManualTest = new index_1.ManualTest();
                    this.ManualTest.OperatorInfo = this._configService.GetOperatorInfo();
                };
                AppService.prototype.LoadUnitInfo = function (id) {
                    var _this = this;
                    if (this.ManualTest.UnitInfo.TrackingId && this.ManualTest.UnitInfo.TrackingId == id) {
                        return Rx_1.Observable.of(this.ManualTest);
                    }
                    this.Setup();
                    return Rx_1.Observable.create(function (observer) {
                        _this.GetUnitInfoByTrackingId(id)
                            .subscribe(function (unitInfo) {
                            _this.Status.IsProcessing = false;
                            _this.ManualTest.UnitInfo = unitInfo;
                            // Pre-set the number passed and failed to the existing number of passed and failed
                            _this.ManualTest.NumberPassed = unitInfo.NumberOfPassingTests;
                            _this.ManualTest.NumberFailed = unitInfo.NumberOfFailingTests;
                            _this.ManualTest.SingleTestError = _this.SetSingleTestError(unitInfo);
                            _this.ManualTest.BatchTestError = _this.SetTestBatchError(unitInfo);
                            if (!unitInfo.AllowSingleTest && !unitInfo.AllowBatchTest) {
                                _this.EmitError(_this.CannotRecordTests);
                            }
                            observer.next(_this.ManualTest);
                            observer.complete();
                        }, function (error) {
                            _this.Status.IsProcessing = false;
                            _this.EmitError(_this.NoDataFoundForTrackingId);
                        });
                    });
                };
                AppService.prototype.GetUnitInfoByTrackingId = function (id) {
                    this.StartProcessing('Finding Unit');
                    this.ManualTest.UnitInfo.TrackingId = id;
                    if (!this.Config().EnableTest) {
                        return this._http.get(this.GetApiUrl('GetUnitInfoByTrackingId') + "/" + id)
                            .map(function (response) { return response.json().Data; })
                            .catch(this.HandleHttpError);
                    }
                    else {
                        return this._http.get('app/data/UnitInfo.json')
                            .map(function (response) {
                            return (response.json()
                                .find(function (item) { return item.Data.TrackingId == id; }).Data);
                        })
                            .catch(this.HandleHttpError);
                    }
                };
                AppService.prototype.SaveTestResult = function () {
                    var _this = this;
                    this.StartProcessing('Saving Repairs');
                    return Rx_1.Observable.create(function (observer) {
                        var body = JSON.stringify(_this.ManualTest);
                        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                        var options = new http_1.RequestOptions({ headers: headers });
                        if (!_this.Config().EnableTest) {
                            _this._http.post("" + _this.GetApiUrl('SaveTestResult'), body, options)
                                .map(function (response) { return (response.json()); })
                                .catch(function (error) { return _this.HandleHttpError(error); })
                                .subscribe(function (response) {
                                if (response.IsError) {
                                    _this.EmitError(response.Message);
                                }
                                _this.Status.IsProcessing = false;
                                observer.next(response);
                                observer.complete();
                            }, function (error) {
                                _this.EmitError(error.Message);
                            });
                        }
                        else {
                            observer.next({ IsError: false, Message: null });
                            observer.complete();
                        }
                    });
                };
                AppService.prototype.GetTestActivity = function (id) {
                    var _this = this;
                    this.StartProcessing('Getting Activity');
                    return this._http.get(this.GetApiUrl('GetTestActivity') + "/" + id)
                        .map(function (response) { return response.json(); })
                        .catch(function (error) { return _this.HandleHttpError(error); });
                };
                AppService.prototype.GetTestTypes = function () {
                    var _this = this;
                    if (this._testType) {
                        // if 'data' is available just return it as 'Observable'
                        return Rx_1.Observable.of(this._testType);
                    }
                    else if (this._testTypeObservable) {
                        // if `this._testTypeObservable` is set then the request is in progress
                        // return the `Observable` for the ongoing request
                        return this._testTypeObservable;
                    }
                    else {
                        // create the request, store the `Observable` for subsequent subscribers
                        this._testTypeObservable = this._http.get("" + this.GetApiUrl('GetTestTypes'))
                            .map(function (response) {
                            return response.json().Data;
                        })
                            .do(function (data) {
                            _this._testType = data;
                            // when the cached data is available we don't need the `Observable` reference anymore
                            _this._testTypeObservable = null;
                        })
                            .share();
                        return this._testTypeObservable;
                    }
                };
                AppService.prototype.DeleteTestResult = function (id) {
                    var _this = this;
                    this.StartProcessing('Deleting Test Result');
                    return Rx_1.Observable.create(function (observer) {
                        return _this._http.delete(_this.GetApiUrl('DeleteTestResult') + "/" + id)
                            .map(function (response) { return response.json(); })
                            .catch(function (error) { return _this.HandleHttpError(error); })
                            .subscribe(function (response) {
                            _this.Status.IsProcessing = false;
                            observer.next(response);
                            observer.complete();
                        }, function (error) {
                            observer.next(error);
                            observer.complete();
                        });
                    });
                };
                AppService.prototype.DeleteTestResultKey = function (id) {
                    var _this = this;
                    this.StartProcessing('Deleting Test Result Key');
                    return Rx_1.Observable.create(function (observer) {
                        return _this._http.delete(_this.GetApiUrl('DeleteTestResultKey') + "/" + id)
                            .map(function (response) { return response.json(); })
                            .catch(function (error) { return _this.HandleHttpError(error); })
                            .subscribe(function (response) {
                            _this.Status.IsProcessing = false;
                            observer.next(response);
                            observer.complete();
                        }, function (error) {
                            observer.next(error);
                            observer.complete();
                        });
                    });
                };
                AppService.prototype.GoToTests = function (id) {
                    var _this = this;
                    this.Setup();
                    this.LoadUnitInfo(id).subscribe(function (data) {
                        if (data.UnitInfo.AllowSingleTest) {
                            if (!data.Error.IsError && !data.SingleTestError.IsError) {
                                _this._router.navigate(['SingleTest', { id: id }]);
                            }
                        }
                        else if (data.UnitInfo.AllowBatchTest) {
                            if (!data.Error.IsError && !data.BatchTestError.IsError) {
                                _this._router.navigate(['TestBatch', { id: id }]);
                            }
                        }
                    });
                };
                AppService.prototype.GoToSingleTest = function (id) {
                    var _this = this;
                    this.Setup();
                    this.LoadUnitInfo(id).subscribe(function (data) {
                        if (!data.Error.IsError && !data.SingleTestError.IsError) {
                            _this._router.navigate(['SingleTest', { id: id }]);
                        }
                    });
                };
                AppService.prototype.GoToTestBatch = function (id) {
                    var _this = this;
                    this.Setup();
                    this.LoadUnitInfo(id).subscribe(function (data) {
                        if (!data.Error.IsError && !data.BatchTestError.IsError) {
                            _this._router.navigate(['TestBatch', { id: id }]);
                        }
                    });
                };
                AppService.prototype.GoToActivity = function (id) {
                    this._router.navigate(['TestActivity', { id: id }]);
                };
                AppService.prototype.GoToDone = function () {
                    if (this.Config().ReturnUrl !== '') {
                        window.location.href = this.Config().ReturnUrl;
                    }
                    else {
                        this._router.navigate(['Dashboard']);
                    }
                };
                AppService.prototype.ClearError = function () {
                    this._error.next(new error_handler_model_1.ErrorHandler(false, ''));
                };
                AppService.prototype.EmitError = function (message) {
                    this.ManualTest.Error = this.SetError(message);
                    this._error.next(this.ManualTest.Error);
                };
                AppService.prototype.SetError = function (message) {
                    return new error_handler_model_1.ErrorHandler(true, message);
                };
                AppService.prototype.SetSingleTestError = function (unitInfo) {
                    return this.ConditionNotMet(unitInfo.AllowSingleTest, this.CannotRecordSingleTests);
                };
                AppService.prototype.SetTestBatchError = function (unitInfo) {
                    var errorHandler = this.ConditionNotMet(unitInfo.AllowBatchTest, this.CannotRecordBatchTests);
                    if (unitInfo.AllowBatchTest && unitInfo.AllowBatchTestNumber == 0) {
                        // Batch tests are only allowed if AllowBatchTestNumber > 0
                        errorHandler = this.ConditionNotMet(unitInfo.AllowBatchTest && unitInfo.AllowBatchTestNumber > 0, this.BatchTestLimitReached);
                    }
                    return errorHandler;
                };
                AppService.prototype.AllowSingleTest = function () {
                    return this.ManualTest.UnitInfo.AllowSingleTest
                        || this.AreDiagnositcsEnabled();
                };
                AppService.prototype.AllowBatchTest = function () {
                    return (this.ManualTest.UnitInfo.AllowBatchTest
                        && this.ManualTest.UnitInfo.AllowBatchTestNumber > 0)
                        || this.AreDiagnositcsEnabled();
                };
                AppService.prototype.AreDiagnositcsEnabled = function () {
                    return this.Config().AllowDiagnostics && this.Config().EnableDiagnostics;
                };
                AppService.prototype.IsActivityEnabled = function () {
                    return this.Config().EnableActivity;
                };
                AppService.prototype.ConditionNotMet = function (condition, message) {
                    var errorHandler = new error_handler_model_1.ErrorHandler();
                    if (!condition && !this.AreDiagnositcsEnabled()) {
                        errorHandler.IsError = true;
                        errorHandler.Message = message;
                    }
                    return errorHandler;
                };
                AppService.prototype.StartProcessing = function (message) {
                    this.Status.IsProcessing = true;
                    this.Status.Message = message;
                };
                AppService.prototype.GetApiUrl = function (apiEndPoint) {
                    return this.Config().ApiUrls.BaseUrl
                        + '/' + this.Config().ApiUrls[apiEndPoint];
                };
                AppService.prototype.ExtractData = function (res) {
                    if (res.status < 200 || res.status >= 300) {
                        throw new Error('Bad Response Status: ' + res.status);
                    }
                    var body = res.json();
                    return body || {};
                };
                AppService.prototype.HandleHttpError = function (response) {
                    var handledResponse = {};
                    this.Status.IsProcessing = false;
                    try {
                        if (response.status == 404) {
                            handledResponse = {
                                code: 404,
                                message: 'Data Not Found'
                            };
                        }
                        else if (response.status == 500) {
                            var responseJson = response.json();
                            handledResponse = {
                                IsError: true,
                                Message: responseJson.Message
                            };
                        }
                        else {
                            var responseJson = response.json();
                            handledResponse = {
                                IsError: true,
                                Message: (responseJson.Message) ? responseJson.Message : response.json()
                            };
                        }
                    }
                    catch (jsonError) {
                        handledResponse = {
                            code: -1,
                            message: 'Something Went Wrong.'
                        };
                    }
                    return Rx_1.Observable.throw(handledResponse);
                };
                AppService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, router_deprecated_1.Router, config_service_1.ConfigService])
                ], AppService);
                return AppService;
            }());
            exports_1("AppService", AppService);
        }
    }
});

//# sourceMappingURL=app.service.js.map
