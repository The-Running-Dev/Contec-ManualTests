export interface TestResultKey {
    TestId: number;

    KeyType: number;

    KeyValue: string;

    DataSourceId: number;

    CreateDate: Date;

    CreatedBy: string;

    // View model column to confirm the delete
    ConfirmDelete: boolean;
}