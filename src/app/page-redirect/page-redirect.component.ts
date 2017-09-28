import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Angulartics2 } from 'angulartics2';
import {Location} from '@angular/common';
import { Observable } from "rxjs";

@Component({
    templateUrl: './page-redirect.component.html',
    styleUrls: ['./page-redirect.component.css']    
})
export class PageRedirectComponent { 

    private sub: any;
    // private angulartics2: any
    private timer:any;

    constructor(
		// angulartics2: Angulartics2,
        private route: ActivatedRoute,
        private location:Location,
        private ngZone:NgZone) {
			// this.angulartics2 = angulartics2;
    }
    ngOnInit() {
        let url: string;
		this.sub = this.route.params.subscribe(params => {
       url = params['externalUrl'];
        });

        // this.angulartics2.eventTrack.next({ action: 'NavigateToExternalUrl', properties: { category: 'NavigationEvent' }});
        
        this.ngZone.runOutsideAngular(() => {
            this.timer = Observable.interval(5000).subscribe({
                next(result) {
                    // navigate to the URL (Assumes the url is http:// or https://
                    window.location.href=url;
                }
            });
        });
    }
    
    goBack() {
        this.location.back();
    }
}