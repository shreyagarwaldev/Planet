import { Component, Output, EventEmitter, Input } from '@angular/core';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService';

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

    constructor(public gaService: GoogleAnalyticsService) {
        this.hideNavbar = true;
        this.hideSubscribe = true;
        this.hideShare = true;
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

    submitEmail() {
        console.log(this.emailId);
        this.toggleSubscribeBlock();
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