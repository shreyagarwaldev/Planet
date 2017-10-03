import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './terms-and-conditions.component.html',
    styleUrls: ['./terms-and-conditions.component.scss']
})

export class TermsAndConditionsComponent {
    constructor(gaService : GoogleAnalyticsService, titleService: Title) {
        gaService.trackPageView('TermsAndConditions');
        titleService.setTitle('Terms & Conditions - Pixelated Planet');
    }
}