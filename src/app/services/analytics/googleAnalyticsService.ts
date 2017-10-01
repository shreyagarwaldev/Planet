import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GoogleAnalyticsService {

    private trackingId = 'UA-103414645-1';
    private gaUrl = 'https://www.google-analytics.com/collect?'

    constructor(public http: Http) {
    }

    public trackPageView(pageName : string)
    {
        var url = `${this.gaUrl}v=1&tid=${this.trackingId}&cid=555&t=pageview&dp=${pageName}`;
        this.http.post(url, '').toPromise().then();
    }

    public trackEvent(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: string)
    {
        var url = `${this.gaUrl}v=1&tid=${this.trackingId}&cid=555&t=event&ec=${eventCategory}&ea=${eventAction}`;
        url += eventLabel && eventLabel != "" ? `&el=${eventLabel}` : '';
        url += eventValue && eventValue != "" ? `&ev=${eventValue}` : '';
        this.http.post(url, '').toPromise().then();
    }
}