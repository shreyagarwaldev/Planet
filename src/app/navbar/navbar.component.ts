import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService';
import { Http, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'

@Component({
    selector: 'navi-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavComponent {
    hideNavbar: boolean;
    hideSubscribe: boolean;
    hideShare: boolean;
    emailId: string;
    @Output() filtersDropdownToggle = new EventEmitter();
    @Input() showFilters: boolean;
    @Input() showSocialBlock: boolean;
    @Input() showName: boolean;
    @Input() hideFilter: boolean

    constructor(public gaService: GoogleAnalyticsService,
        public http: Http,
        public router: Router,
        public globalConstants: GlobalConstantsRepository) {
    }
    toggleFilter() {
        this.hideFilter = !this.hideFilter;
        if (!this.hideNavbar) {
            this.hideNavbar = true;
        }
        if (!this.hideShare) {
            this.hideShare = true;
        }
        if (!this.hideSubscribe) {
            this.hideSubscribe = true;
        }
        this.filtersDropdownToggle.emit(this.hideFilter);
    }

    ngOnInit() {
        this.hideNavbar = true;
        this.hideSubscribe = true;
        this.hideShare = true;
    }

    submitEmail() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions();
        options.headers = headers;
        this.http.post(this.globalConstants.getSubscribeAPIUrl(), `"${this.emailId}"`, options).toPromise().then(e => {
            this.toggleSubscribeBlock();
        }).catch(a => {
            // TODO - need to show error here
            this.toggleSubscribeBlock();
        });
    }

    toggleNavbar() {
        this.hideNavbar = !this.hideNavbar;
        if (!this.hideFilter) {
            this.hideFilter = true;
            this.filtersDropdownToggle.emit(this.hideFilter);
        }
        if (!this.hideShare) {
            this.hideShare = true;
        }
        if (!this.hideSubscribe) {
            this.hideSubscribe = true;
        }
    }

    toggleSubscribeBlock() {
        this.hideSubscribe = !this.hideSubscribe;
        if (!this.hideNavbar) {
            this.hideNavbar = true;
        }
        if (!this.hideShare) {
            this.hideShare = true;
        }

    }

    toggleShareBlock() {
        this.hideShare = !this.hideShare;
        if (!this.hideSubscribe) {
            this.hideSubscribe = true;
        }
        if (!this.hideNavbar) {
            this.hideNavbar = true;
        }
    }

    onNavButtonClick(buttonName: string) {
        this.gaService.trackEvent(buttonName, 'Click');
    }
}