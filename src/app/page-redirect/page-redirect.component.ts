import { Component, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Observable } from "rxjs";

@Component({
    templateUrl: './page-redirect.component.html',
    styleUrls: ['./page-redirect.component.css']    
})
export class PageRedirectComponent { 

    private sub: any;
    private timer:any;

    constructor(
        private route: ActivatedRoute,
        private location:Location,
        private ngZone:NgZone) {
    }
    ngOnInit() {
        let url: string;
		this.sub = this.route.params.subscribe(params => {
       url = params['externalUrl'];
        });
        
        this.ngZone.runOutsideAngular(() => {
            this.timer = Observable.interval(5000).subscribe({
                next(result) {
                    try
                    {
                    // navigate to the URL (Assumes the url is http:// or https://
                    window.location.href=url;
                    }
                    catch(e)
                    {
                        // we know there will be an error here
                    }
                }
            });
        });
    }
    
    goBack() {
        this.location.back();
    }
}