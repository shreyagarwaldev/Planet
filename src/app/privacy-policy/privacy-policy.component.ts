import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss']
})

export class PrivacyComponent {
    constructor(gaService : GoogleAnalyticsService) {
        gaService.trackPageView('PrivacyPolicy');
    }
}