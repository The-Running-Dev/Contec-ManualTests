import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig } from '@angular/router-deprecated';
import { Location } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

import {
    DashboardComponent,
    SingleTestComponent,
    BatchTestComponent,
    TestActivityComponent
}
    from './index';
import { AppService, ConfigService } from './shared/index';
import { ErrorHandlerComponent } from './error-handler/index';

@RouteConfig([
    {
        path: 'dashboard',
        as: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: 'single-test/:id',
        as: 'SingleTest',
        component: SingleTestComponent
    },
    {
        path: 'batch-test/:id',
        as: 'TestBatch',
        component: BatchTestComponent
    },
    {
        path: 'test-activity/:id',
        as: 'TestActivity',
        component: TestActivityComponent
    }
])

@Component({
    selector: 'manual-tests',
    templateUrl: 'app/app.component.html',
    directives: [
        ROUTER_DIRECTIVES,
        ErrorHandlerComponent
    ],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        ConfigService,
        AppService
    ]
})

export class AppComponent implements OnInit {
    public isTrackingIdValid: boolean;

    constructor(
        public Service: AppService,
        private location: Location
    ) {
    }

    ngOnInit() {
        // Get the path, cast it as number
        let path = this.location.path().replace('/', '');
        let id = +path;

        if (id) {
            // Go to the tests for that tracking ID
            this.Service.GoToTests(id);
        }

        this.isTrackingIdValid = false;
    }

    isRouteActive(routePath: string) {
        let path = this.location.path();
        let isCurrentPath = path.match(new RegExp(`${routePath}/`, 'gi'));
        let isDefaultRoute = path === '' || routePath.match(new RegExp('dashboard', 'gi')) !== null;

        if (isDefaultRoute) {
            return true;
        } else if (isCurrentPath != null) {
            return true;
        }

        return false;
    }
}