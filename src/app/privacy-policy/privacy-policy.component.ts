import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss']
})

export class PrivacyComponent {
    constructor(gaService : GoogleAnalyticsService, titleService: Title) {
        gaService.trackPageView('PrivacyPolicy');
        titleService.setTitle('Privacy Policy - Pixelated Planet');
    }
}