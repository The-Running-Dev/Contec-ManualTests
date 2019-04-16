System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AppConfig;
    return {
        setters:[],
        execute: function() {
            // Provides the base configuration for the application
            AppConfig = (function () {
                function AppConfig() {
                    this.ApiUrls = {
                        BaseUrl: 'http://crs.services.local.com',
                        GetUnitInfoByTrackingId: 'api/tracker/UnitInfo',
                        GetTestTypes: 'api/testing/TestTypes',
                        SaveTestResult: 'api/testing',
                        GetTestActivity: 'api/testing/Activity',
                        DeleteTestResult: 'api/testing/TestResult',
                        DeleteTestResultKey: 'api/testing/TestResultKey'
                    };
                    this.ProductionMode = false;
                    this.ReturnUrl = document.referrer;
                    this.AllowDiagnostics = true;
                    this.EnableDiagnostics = true;
                    this.EnableActivity = true;
                    this.EnableTest = false;
                    this.CustomerId = 0;
                    this.SiteId = 0;
                    this.StationId = 0;
                    this.StationName = 'Dev';
                    this.StationTypeId = 0;
                    this.StationType = 'Type';
                    this.EventTypeId = 0;
                    this.StatusCode = 0;
                    this.OperatorId = 'Dev';
                    this.OperatorName = 'Dev';
                }
                return AppConfig;
            }());
            exports_1("AppConfig", AppConfig);
            ;
        }
    }
});

//# sourceMappingURL=app.config.js.map
