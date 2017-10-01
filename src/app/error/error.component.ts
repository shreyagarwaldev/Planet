import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
    constructor(gaService : GoogleAnalyticsService) {
        gaService.trackPageView('404');
    }
}