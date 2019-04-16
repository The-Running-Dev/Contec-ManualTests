System.register(['@angular/core', '@angular/router-deprecated', '@angular/common', '@angular/http', './index', './shared/index', './error-handler/index'], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, common_1, http_1, index_1, index_2, index_3;
    var AppComponent;
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
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (index_2_1) {
                index_2 = index_2_1;
            },
            function (index_3_1) {
                index_3 = index_3_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(Service, location) {
                    this.Service = Service;
                    this.location = location;
                }
                AppComponent.prototype.ngOnInit = function () {
                    // Get the path, cast it as number
                    var path = this.location.path().replace('/', '');
                    var id = +path;
                    if (id) {
                        // Go to the tests for that tracking ID
                        this.Service.GoToTests(id);
                    }
                    this.isTrackingIdValid = false;
                };
                AppComponent.prototype.isRouteActive = function (routePath) {
                    var path = this.location.path();
                    var isCurrentPath = path.match(new RegExp(routePath + "/", 'gi'));
                    var isDefaultRoute = path === '' || routePath.match(new RegExp('dashboard', 'gi')) !== null;
                    if (isDefaultRoute) {
                        return true;
                    }
                    else if (isCurrentPath != null) {
                        return true;
                    }
                    return false;
                };
                AppComponent = __decorate([
                    router_deprecated_1.RouteConfig([
                        {
                            path: 'dashboard',
                            as: 'Dashboard',
                            component: index_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: 'single-test/:id',
                            as: 'SingleTest',
                            component: index_1.SingleTestComponent
                        },
                        {
                            path: 'batch-test/:id',
                            as: 'TestBatch',
                            component: index_1.BatchTestComponent
                        },
                        {
                            path: 'test-activity/:id',
                            as: 'TestActivity',
                            component: index_1.TestActivityComponent
                        }
                    ]),
                    core_1.Component({
                        selector: 'manual-tests',
                        templateUrl: 'app/app.component.html',
                        directives: [
                            router_deprecated_1.ROUTER_DIRECTIVES,
                            index_3.ErrorHandlerComponent
                        ],
                        providers: [
                            router_deprecated_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS,
                            index_2.ConfigService,
                            index_2.AppService
                        ]
                    }), 
                    __metadata('design:paramtypes', [index_2.AppService, common_1.Location])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});

//# sourceMappingURL=app.component.js.map
