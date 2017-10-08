import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent {

    messageText: string;

    constructor(gaService : GoogleAnalyticsService, title: Title, meta: Meta) {
    }

    submitFeedback() {
        if(this.messageText && this.messageText !== "") {
            let xyz = this.messageText;
        }
    }
}