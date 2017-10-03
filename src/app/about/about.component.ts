import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent {
    constructor(gaService : GoogleAnalyticsService, titleService: Title) {
        gaService.trackPageView('About');
        titleService.setTitle('About Us - Pixelated Planet');
    }
}