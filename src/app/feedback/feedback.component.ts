import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { Http } from '@angular/http'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'

interface FeedbackFormData {
    feedback: string;
}

@Component({
    templateUrl: './feedback.component.html',
    styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent {

    messageText: string;
    isSuccess: boolean;
    submitStatus: string;

    constructor(gaService : GoogleAnalyticsService, title: Title, meta: Meta, public http:Http, public globalConstants: GlobalConstantsRepository) {
        this.isSuccess = false;
    }

    submitFeedback() {
        if(this.messageText  && this.messageText !== "") {
            this.submitStatus = "Submitting feedback ...";
            this.isSuccess = true;
            var email = <FeedbackFormData>{};
            email.feedback = this.messageText;
            this.http.post(this.globalConstants.getFeedbackAPIUrl(), email).toPromise().then(e => {
                this.submitStatus = "Feedback submitted successfully!";
            }).catch(a => 
            {
                this.submitStatus = "Shoot! Something went wrong. Please try again!";
            });
        }
    }
}