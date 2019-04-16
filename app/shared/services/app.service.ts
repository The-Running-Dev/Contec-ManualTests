import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { NextObserver } from 'rxjs/Observer';

import { AppConfig } from '../../app.config';
import { ConfigService } from './config.service';
import { ApiResponse, ManualTest, TestType, UnitInfo } from '../models/index';
import { ErrorHandler } from '../../error-handler/error-handler.model';

@Injectable()

export class AppService {
    public Status = {IsProcessing: false, Message: ''};
    public ManualTest: ManualTest;

    public CannotRecordSingleTests: string = 'You Cannot Record Single Tests for This Unit';
    public CannotRecordBatchTests: string = 'You Cannot Record Batch Tests for This Unit';
    public BatchTestLimitReached: string = 'You Have Reached the Number of Allowed Tests';
    public CannotRecordTests: string = 'You Cannot Record Tests for This Unit';
    public NoDataFoundForTrackingId: string = 'No Data Found for This Tracking ID';

    private _error: Subject<ErrorHandler>;
    private _unitInfo: Subject<UnitInfo>;
    private _testType: TestType[];
    private _testTypeObservable: Observable<any>;

    constructor(private _http: Http,
                private _router: Router,
                private _configService: ConfigService) {
        this._unitInfo = new Subject<UnitInfo>();
        this._error = new Subject<ErrorHandler>();

        this.Setup();
    }

    public get Error$(): Observable<ErrorHandler> {
        return this._error.asObservable();
    }

    public get UnitInfo$(): Observable<UnitInfo> {
        return this._unitInfo.asObservable();
    }

    public Config(): AppConfig {
        return this._configService.AppConfig;
    }

    public IsTrackingIdValid(trackingId: number) {
        this.StartProcessing('Validating Tracking ID');

        return new Promise(resolve => {
            this.GetUnitInfoByTrackingId(trackingId)
                .subscribe((unitInfo: UnitInfo) => {
                    this.Status.IsProcessing = false;

                    if (unitInfo.TrackingId == 0) {
                        // need to return false if not ok
                        resolve({dataExists: false});
                    } else {
                        this._unitInfo.next(unitInfo);

                        // need to return null if ok
                        resolve(null);
                    }
                }, error => {
                    this.Status.IsProcessing = false;
                });
        });
    }

    public Setup(): void {
        this.ClearError();

        this.ManualTest = new ManualTest();
        this.ManualTest.OperatorInfo = this._configService.GetOperatorInfo();
    }

    public LoadUnitInfo(id: number): Observable<ManualTest> {
        if (this.ManualTest.UnitInfo.TrackingId && this.ManualTest.UnitInfo.TrackingId == id) {
            return Observable.of(this.ManualTest);
        }

        this.Setup();

        return Observable.create((observer: NextObserver<ManualTest>) => {
            this.GetUnitInfoByTrackingId(id)
                .subscribe((unitInfo: UnitInfo) => {
                    this.Status.IsProcessing = false;
                    this.ManualTest.UnitInfo = unitInfo;

                    // Pre-set the number passed and failed to the existing number of passed and failed
                    this.ManualTest.NumberPassed = unitInfo.NumberOfPassingTests;
                    this.ManualTest.NumberFailed = unitInfo.NumberOfFailingTests;

                    this.ManualTest.SingleTestError = this.SetSingleTestError(unitInfo);
                    this.ManualTest.BatchTestError = this.SetTestBatchError(unitInfo);

                    if (!unitInfo.AllowSingleTest && !unitInfo.AllowBatchTest) {
                        this.EmitError(this.CannotRecordTests);
                    }

                    observer.next(this.ManualTest);
                    observer.complete();
                }, (error: any) => {
                    this.Status.IsProcessing = false;
                    this.EmitError(this.NoDataFoundForTrackingId);
                });
        });
    }

    public GetUnitInfoByTrackingId(id: number): Observable<UnitInfo> {
        this.StartProcessing('Finding Unit');
        this.ManualTest.UnitInfo.TrackingId = id;

        if (!this.Config().EnableTest) {
            return this._http.get(`${this.GetApiUrl('GetUnitInfoByTrackingId')}/${id}`)
                .map(response => <UnitInfo>(<ApiResponse>response.json()).Data)
                .catch(this.HandleHttpError);
        }
        else {
            return this._http.get('app/data/UnitInfo.json')
                .map(response => {
                    return <UnitInfo>((<ApiResponse[]>response.json())
                        .find((item: ApiResponse) => item.Data.TrackingId == id).Data);
                })
                .catch(this.HandleHttpError);
        }
    }

    public SaveTestResult(): Observable<ApiResponse> {
        this.StartProcessing('Saving Repairs');

        return Observable.create((observer: NextObserver<ApiResponse>) => {
            let body = JSON.stringify(this.ManualTest);
            let headers = new Headers({'Content-Type': 'application/json'});
            let options = new RequestOptions({headers: headers});

            if (!this.Config().EnableTest) {
                this._http.post(`${this.GetApiUrl('SaveTestResult')}`, body, options)
                    .map((response: Response) => (<ApiResponse>response.json()))
                    .catch((error: any) => this.HandleHttpError(error))
                    .subscribe((response: ApiResponse) => {
                        if (response.IsError) {
                            this.EmitError(response.Message);
                        }

                        this.Status.IsProcessing = false;
                        observer.next(response);
                        observer.complete();
                    }, error => {
                        this.EmitError(error.Message);
                    });
            }
            else {
                observer.next(<ApiResponse>{IsError: false, Message: null});
                observer.complete();
            }
        });
    }

    public GetTestActivity(id: number): Observable<ApiResponse> {
        this.StartProcessing('Getting Activity');

        return this._http.get(`${this.GetApiUrl('GetTestActivity')}/${id}`)
            .map(response => <ApiResponse>response.json())
            .catch((error: any) => this.HandleHttpError(error));
    }

    public GetTestTypes(): Observable<TestType[]> {
        if (this._testType) {
            // if 'data' is available just return it as 'Observable'
            return Observable.of(this._testType);
        } else if (this._testTypeObservable) {
            // if `this._testTypeObservable` is set then the request is in progress
            // return the `Observable` for the ongoing request
            return this._testTypeObservable;
        } else {
            // create the request, store the `Observable` for subsequent subscribers
            this._testTypeObservable = this._http.get(`${this.GetApiUrl('GetTestTypes')}`)
                .map((response: Response) => {
                    return <TestType[]>(<ApiResponse>response.json()).Data;
                })
                .do((data: TestType[]) => {
                    this._testType = data;

                    // when the cached data is available we don't need the `Observable` reference anymore
                    this._testTypeObservable = null;
                })
                // make it shared so more than one subscriber can get the result
                .share();

            return this._testTypeObservable;
        }
    }

    public DeleteTestResult(id: number): Observable<ApiResponse> {
        this.StartProcessing('Deleting Test Result');

        return Observable.create((observer: NextObserver<ApiResponse>) => {
            return this._http.delete(`${this.GetApiUrl('DeleteTestResult')}/${id}`)
                .map(response => <ApiResponse>response.json())
                .catch((error: any) => this.HandleHttpError(error))
                .subscribe((response: ApiResponse) => {
                    this.Status.IsProcessing = false;

                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.next(error);
                    observer.complete();
                });
        });
    }

    public DeleteTestResultKey(id: number): Observable<ApiResponse> {
        this.StartProcessing('Deleting Test Result Key');

        return Observable.create((observer: NextObserver<ApiResponse>) => {
            return this._http.delete(`${this.GetApiUrl('DeleteTestResultKey')}/${id}`)
                .map(response => <ApiResponse>response.json())
                .catch((error: any) => this.HandleHttpError(error))
                .subscribe((response: ApiResponse) => {
                    this.Status.IsProcessing = false;

                    observer.next(response);
                    observer.complete();
                }, error => {
                    observer.next(error);
                    observer.complete();
                });
        });
    }

    public GoToTests(id: number): void {
        this.Setup();

        this.LoadUnitInfo(id).subscribe((data: ManualTest) => {
            if (data.UnitInfo.AllowSingleTest) {
                if (!data.Error.IsError && !data.SingleTestError.IsError) {
                    this._router.navigate(['SingleTest', {id: id}]);
                }
            }
            else if (data.UnitInfo.AllowBatchTest) {
                if (!data.Error.IsError && !data.BatchTestError.IsError) {
                    this._router.navigate(['TestBatch', {id: id}]);
                }
            }
        });
    }

    public GoToSingleTest(id: number): void {
        this.Setup();

        this.LoadUnitInfo(id).subscribe((data: ManualTest) => {
            if (!data.Error.IsError && !data.SingleTestError.IsError) {
                this._router.navigate(['SingleTest', {id: id}]);
            }
        });
    }

    public GoToTestBatch(id: number): void {
        this.Setup();

        this.LoadUnitInfo(id).subscribe((data: ManualTest) => {
            if (!data.Error.IsError && !data.BatchTestError.IsError) {
                this._router.navigate(['TestBatch', {id: id}]);
            }
        });
    }

    public GoToActivity(id: number): void {
        this._router.navigate(['TestActivity', {id: id}]);
    }

    public GoToDone(): void {
        if (this.Config().ReturnUrl !== '') {
            window.location.href = this.Config().ReturnUrl;
        }
        else {
            this._router.navigate(['Dashboard']);
        }
    }

    public ClearError(): void {
        this._error.next(new ErrorHandler(false, ''));
    }

    public EmitError(message: string): void {
        this.ManualTest.Error = this.SetError(message);
        this._error.next(this.ManualTest.Error);
    }

    public SetError(message: string): ErrorHandler {
        return new ErrorHandler(true, message);
    }

    public SetSingleTestError(unitInfo: UnitInfo): ErrorHandler {
        return this.ConditionNotMet(unitInfo.AllowSingleTest, this.CannotRecordSingleTests);
    }

    public SetTestBatchError(unitInfo: UnitInfo): ErrorHandler {
        let errorHandler = this.ConditionNotMet(unitInfo.AllowBatchTest, this.CannotRecordBatchTests);

        if (unitInfo.AllowBatchTest && unitInfo.AllowBatchTestNumber == 0) {
            // Batch tests are only allowed if AllowBatchTestNumber > 0
            errorHandler = this.ConditionNotMet(unitInfo.AllowBatchTest && unitInfo.AllowBatchTestNumber > 0, this.BatchTestLimitReached);
        }

        return errorHandler;
    }

    public AllowSingleTest(): boolean {
        return this.ManualTest.UnitInfo.AllowSingleTest
            || this.AreDiagnositcsEnabled();
    }

    public AllowBatchTest(): boolean {
        return (this.ManualTest.UnitInfo.AllowBatchTest
                && this.ManualTest.UnitInfo.AllowBatchTestNumber > 0
            )
            || this.AreDiagnositcsEnabled();
    }

    public AreDiagnositcsEnabled(): boolean {
        return this.Config().AllowDiagnostics && this.Config().EnableDiagnostics;
    }

    public IsActivityEnabled(): boolean {
        return this.Config().EnableActivity;
    }

    private ConditionNotMet(condition: boolean, message: string): ErrorHandler {
        let errorHandler = new ErrorHandler();

        if (!condition && !this.AreDiagnositcsEnabled()) {
            errorHandler.IsError = true;
            errorHandler.Message = message;
        }

        return errorHandler;
    }

    private StartProcessing(message: string): void {
        this.Status.IsProcessing = true;
        this.Status.Message = message;
    }

    private GetApiUrl(apiEndPoint: string): string {
        return this.Config().ApiUrls.BaseUrl
            + '/' + this.Config().ApiUrls[apiEndPoint];
    }

    private ExtractData(res: Response): any {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad Response Status: ' + res.status);
        }

        let body = res.json();

        return body || {};
    }

    private HandleHttpError(response: Response) {
        let handledResponse = {};
        this.Status.IsProcessing = false;

        try {
            if (response.status == 404) {
                handledResponse = {
                    code   : 404,
                    message: 'Data Not Found'
                };
            }
            else if (response.status == 500) {
                let responseJson = <any>response.json();

                handledResponse = {
                    IsError: true,
                    Message: responseJson.Message
                };
            }
            else {
                let responseJson = <any>response.json();

                handledResponse = {
                    IsError: true,
                    Message: (responseJson.Message) ? responseJson.Message : response.json()
                };
            }
        } catch (jsonError) {
            handledResponse = {
                code   : -1,
                message: 'Something Went Wrong.'
            };
        }

        return Observable.throw(handledResponse);
    }
}