import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss']
})

export class TermsAndConditionsComponent {
    constructor(gaService : GoogleAnalyticsService) {
        gaService.trackPageView('TermsAndConditions');
    }
}