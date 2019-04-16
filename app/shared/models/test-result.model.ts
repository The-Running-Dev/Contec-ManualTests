export interface TestResult {
    ID: number;

    TestType: number;

    SN: string;

    ProductID: string;

    Model: string;

    TestDate: Date;

    CustomerID: number;

    SiteID: number;

    Station: string;

    Operator: string;

    TestResult: string;

    FailureCode: number;

    FailureMessage?: any;

    Details: string;

    DetailsType: number;

    Params?: any;

    ParamsType: number;

    CreateDate: Date;

    Quantity: number;

    // View model column to confirm the delete
    ConfirmDelete: boolean;
}