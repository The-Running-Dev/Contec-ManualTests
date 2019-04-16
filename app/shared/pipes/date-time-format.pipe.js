System.register(['@angular/core', 'moment'], function(exports_1, context_1) {
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
    var core_1, moment;
    var m, DateTimeFormat;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (moment_1) {
                moment = moment_1;
            }],
        execute: function() {
            // under SystemJs, moment is actually exported as the default export, account for that
            m = moment.default || moment;
            DateTimeFormat = (function () {
                function DateTimeFormat() {
                }
                DateTimeFormat.prototype.transform = function (value, dateFormat, timeFormat) {
                    // The date/moment should always be in UTC
                    // so append 'Z' to the end of the date if it's not there
                    var v = (value.toString().match(/z$/gi)) ? value : value + "Z";
                    var df = (dateFormat) ? dateFormat : 'L';
                    var tf = (timeFormat) ? timeFormat : 'h:mm A';
                    var date = m(m(v).utc().toDate());
                    return date.format(df) + " " + date.format(tf);
                };
                DateTimeFormat = __decorate([
                    core_1.Pipe({ name: 'dateTimeFormat' }), 
                    __metadata('design:paramtypes', [])
                ], DateTimeFormat);
                return DateTimeFormat;
            }());
            exports_1("DateTimeFormat", DateTimeFormat);
        }
    }
});

//# sourceMappingURL=date-time-format.pipe.js.map
