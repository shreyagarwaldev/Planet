import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConstantsRepository } from '../shared/globalConstantsRepository'
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class PixelatedAnalyticsService {

    constructor(@Inject(PLATFORM_ID) public platformId: string, public http: Http, public globalConstants: GlobalConstantsRepository) {
    }

    public trackPageView(pageName : string)
    {
        this.trackEvent("PageView", pageName);
    }

    public trackEvent(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: string)
    {
        if(!isPlatformBrowser(this.platformId))
        {
            return;
        }

        // all code after this gets executed only on the browser
        let href = window.location.href;
        let isTest = href.indexOf('thepixelatedplanet.com') < 0;

        var url = `${this.globalConstants.getAnalyticsAPIUrl()}?id=${this.globalConstants.getSessionGUID()}&isTest=${isTest}&ec=${eventCategory}&ea=${eventAction}`;
        url += eventLabel && eventLabel !== "" ? `&el=${eventLabel}` : '';
        url += eventValue && eventValue !== "" ? `&ev=${eventValue}` : '';

        var ipAddress = this.globalConstants.getIPAddress();
        if(ipAddress && ipAddress !== "")
        {
            this.http.post(`${url}&ip=${ipAddress}`, '').toPromise().then().catch();
        }
        else
        {
            this.http.get('https://api.ipify.org?format=json').toPromise().then(response => {
                this.http.post(`${url}&ip=${response.json()["ip"]}`, '').toPromise().then().catch();
            }).catch(e => { 
                this.http.post(url, '').toPromise().then().catch();
            });
        }
    }
}