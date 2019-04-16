import {TestResult} from './test-result.model';
import {TestResultKey} from './test-result-key.model';

export interface TestActivity {
    TestResults: TestResult[];

    TestResultKeys: TestResultKey[];
}