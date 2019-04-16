// Provides the base configuration for the application
export class AppConfig {
    public CustomerId: number;

    public SiteId: number;

    public StationId: number;

    public StationName: string;

    public StationTypeId: number;

    public StationType: string;

    public EventTypeId: number;

    public StatusCode: number;

    public OperatorId: string;

    public OperatorName: string;

    public ProductionMode: boolean;

    public ReturnUrl: string;

    public AllowDiagnostics: boolean;

    public EnableDiagnostics: boolean;

    public EnableActivity: boolean;

    public EnableTest: boolean;

    public ApiUrls = {
        BaseUrl: 'http://crs.services.local.com',
        GetUnitInfoByTrackingId: 'api/tracker/UnitInfo',
        GetTestTypes: 'api/testing/TestTypes',
        SaveTestResult: 'api/testing',
        GetTestActivity: 'api/testing/Activity',
        DeleteTestResult: 'api/testing/TestResult',
        DeleteTestResultKey: 'api/testing/TestResultKey'
    };

    constructor() {
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
};