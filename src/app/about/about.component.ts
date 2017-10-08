import { Component } from '@angular/core';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent {
    constructor(gaService : GoogleAnalyticsService) {
        gaService.trackPageView('About');
    }
}