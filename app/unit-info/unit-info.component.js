System.register(['@angular/core', '../shared/index', '../shared/pipes/date-time-format.pipe', '../shared/services/app.service'], function(exports_1, context_1) {
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
    var core_1, index_1, date_time_format_pipe_1, app_service_1;
    var UnitInfoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (index_1_1) {
                index_1 = index_1_1;
            },
            function (date_time_format_pipe_1_1) {
                date_time_format_pipe_1 = date_time_format_pipe_1_1;
            },
            function (app_service_1_1) {
                app_service_1 = app_service_1_1;
            }],
        execute: function() {
            UnitInfoComponent = (function () {
                function UnitInfoComponent(Service) {
                    this.Service = Service;
                }
                // Subscribe to the change event and update the model
                UnitInfoComponent.prototype.ngOnChanges = function (changes) {
                    var key = 'unitInfo';
                    this.Model = changes[key].currentValue;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', index_1.UnitInfo)
                ], UnitInfoComponent.prototype, "unitInfo", void 0);
                UnitInfoComponent = __decorate([
                    core_1.Component({
                        selector: 'unit-info',
                        templateUrl: 'app/unit-info/unit-info.component.html',
                        styleUrls: ['app/unit-info/unit-info.component.css'],
                        pipes: [date_time_format_pipe_1.DateTimeFormat]
                    }), 
                    __metadata('design:paramtypes', [app_service_1.AppService])
                ], UnitInfoComponent);
                return UnitInfoComponent;
            }());
            exports_1("UnitInfoComponent", UnitInfoComponent);
        }
    }
});

//# sourceMappingURL=unit-info.component.js.map
