import {ErrorHandler} from '../../error-handler/error-handler.model';
import {OperatorInfo} from './operator-info.model';
import {UnitInfo} from './unit-info.model';
import {TestResultType} from './test-result-type.enum';

export class ManualTest {
    public UnitInfo: UnitInfo;

    public OperatorInfo: OperatorInfo;

    public ErrorCode: string;

    public ErrorMessage: string;

    public TestTypeId: number;

    public TestResult: TestResultType;

    public SerialNumber: string;

    public Quantity: number;

    public NumberFailed: number;

    public NumberPassed: number;

    public Error: ErrorHandler;

    public SingleTestError: ErrorHandler;

    public BatchTestError: ErrorHandler;

    constructor() {
        this.Error = new ErrorHandler();
        this.SingleTestError = new ErrorHandler();
        this.BatchTestError = new ErrorHandler();
        this.OperatorInfo = new OperatorInfo();
        this.UnitInfo = new UnitInfo();
        this.Quantity = 1;

        this.NumberFailed = 0;
        this.NumberPassed = 0;
    }
}