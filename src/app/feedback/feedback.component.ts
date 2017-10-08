import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent {

    messageText: string;
    isSuccess: boolean;

    constructor(gaService : GoogleAnalyticsService, title: Title, meta: Meta) {
        this.isSuccess = false;
    }

    submitFeedback() {
        if(this.messageText && this.messageText !== "") {
            this.isSuccess = true;
            this.messageText = "";
        }
    }
}