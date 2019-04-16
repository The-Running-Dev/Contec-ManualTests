System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var OperatorInfo;
    return {
        setters:[],
        execute: function() {
            OperatorInfo = (function () {
                function OperatorInfo(siteId, stationId, stationName, operatorId, operatorName, timeZone) {
                    this.SiteId = siteId;
                    this.StationId = stationId;
                    this.StationName = stationName;
                    this.OperatorId = operatorId;
                    this.OperatorName = operatorName;
                }
                return OperatorInfo;
            }());
            exports_1("OperatorInfo", OperatorInfo);
        }
    }
});

//# sourceMappingURL=operator-info.model.js.map
