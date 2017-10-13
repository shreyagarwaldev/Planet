import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'

@Component({
    templateUrl: './verify-email.component.html',
    styleUrls: ['./verify-email.component.css']    
})
export class VerifyEmailComponent { 

    public content: string;

    constructor(public http: Http,
                public globalConstants: GlobalConstantsRepository,
                private route: ActivatedRoute) {
            this.content = "Verifying your email subscription ...";
    }

    ngOnInit() {
        let email: string;
        let verifyCode: string;
		email  = this.route.snapshot.queryParams['e'];
        verifyCode  = this.route.snapshot.queryParams['v'];
        
        this.http.post(`${this.globalConstants.getVerifyEmailAPIUrl()}?e=${email}&v=${verifyCode}`, '').toPromise().then(response => {
            this.content = "Successfully verified email. Welcome to the Pixelated Planet family! :)";
        }).catch(e => {
            this.content = "Oops! Something weny wrong. Please try again later! Or write to us at hello@thepixelatedplanet.com";
        });
    }
}