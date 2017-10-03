import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
    constructor(gaService : GoogleAnalyticsService, titleService: Title) {
        gaService.trackPageView('404');
        titleService.setTitle('404 - Pixelated Planet');
    }
}