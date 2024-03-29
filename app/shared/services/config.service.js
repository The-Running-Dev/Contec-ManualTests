System.register(['@angular/core', '../../app.config', '../models/operator-info.model'], function(exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, app_config_1, operator_info_model_1;
    var ConfigService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (app_config_1_1) {
                app_config_1 = app_config_1_1;
            },
            function (operator_info_model_1_1) {
                operator_info_model_1 = operator_info_model_1_1;
            }],
        execute: function() {
            ConfigService = (function () {
                function ConfigService(AppConfig) {
                    this.AppConfig = AppConfig;
                    this._operatorInfo = new operator_info_model_1.OperatorInfo(this.AppConfig.SiteId, this.AppConfig.StationId, this.AppConfig.StationName, this.AppConfig.OperatorId, this.AppConfig.OperatorName);
                }
                ConfigService.prototype.GetOperatorInfo = function () {
                    return this._operatorInfo;
                };
                ConfigService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject('app.config')), 
                    __metadata('design:paramtypes', [app_config_1.AppConfig])
                ], ConfigService);
                return ConfigService;
            }());
            exports_1("ConfigService", ConfigService);
        }
    }
});

//# sourceMappingURL=config.service.js.map
