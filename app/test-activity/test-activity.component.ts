import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {RouteParams} from '@angular/router-deprecated';

import {DataTable, Column, ToggleButton} from 'primeng/primeng';
import {DateTimeFormat} from '../shared/pipes/date-time-format.pipe';

import {AppService} from '../shared/index';
import {ApiResponse, ManualTest, TestResult, TestResultKey} from '../shared/models/index';
import {OperatorInfoComponent} from '../operator-info/operator-info.component';
import {UnitInfoComponent} from '../unit-info/unit-info.component';
import {LoadingContainer, LoadingPage} from '../shared/loading-container';

@Component({
    selector: 'test-activity',
    templateUrl: 'app/test-activity/test-activity.component.html',
    styleUrls: [
        'app/test-activity/test-activity.component.css'
    ],
    directives: [
        LoadingContainer,
        OperatorInfoComponent, UnitInfoComponent,
        DataTable, Column, ToggleButton
    ],
    pipes: [
        DateTimeFormat
    ],
    encapsulation: ViewEncapsulation.None
})

export class TestActivityComponent extends LoadingPage implements OnInit {
    public Model: ManualTest;
    public TestResults: TestResult[];
    public TestResultKeys: TestResultKey[];
    public ApiResponse: ApiResponse;

    constructor(public Service: AppService,
                private _routeParams: RouteParams) {
        super(true);

        this.TestResults = [];
        this.TestResultKeys = [];
        this.ApiResponse = new ApiResponse();
    }

    ngOnInit() {
        this.Model = this.Service.ManualTest;
        let id = +this._routeParams.get('id');

        if (id) {
            this.Service.LoadUnitInfo(id).subscribe((data: ManualTest) => {
                this.Model = data;

                this.Service.GetTestActivity(id).subscribe((response: ApiResponse) => {
                    this.TestResults = response.Data.TestResults;
                    this.TestResultKeys = response.Data.TestResultKeys;
                    this.Service.Status.IsProcessing = false;
                    this.Ready();
                });
            });
        } else {
            this.Service.GoToDone();
        }
    }

    public DeleteTestResult(confirmed: boolean, item: TestResult) {
        if (!confirmed) {
            setTimeout(() => {
                item.ConfirmDelete = !item.ConfirmDelete;
            }, 2000);

            return;
        }

        this.Service.DeleteTestResult(item.ID).subscribe((response: ApiResponse) => {
            this.ApiResponse = response;

            if (!this.ApiResponse.IsError) {
                let testResultKeys: TestResultKey[] = [];

                this.TestResults.splice(this.TestResults.indexOf(item), 1);
                this.TestResultKeys.forEach((key: TestResultKey) => {
                    if (key.TestId != item.ID) {
                        testResultKeys.push(key);
                    }
                });

                this.TestResultKeys = testResultKeys;
            }
        });
    }

    public DeleteTestResultKey(confirmed: boolean, item: TestResultKey) {
        if (!confirmed) {
            setTimeout(() => {
                item.ConfirmDelete = !item.ConfirmDelete;
            }, 2000);

            return;
        }

        this.Service.DeleteTestResultKey(item.TestId).subscribe((response: ApiResponse) => {
            this.ApiResponse = response;

            if (!this.ApiResponse.IsError) {
                this.TestResultKeys.splice(this.TestResultKeys.indexOf(item), 1);
            }
        });
    }
}