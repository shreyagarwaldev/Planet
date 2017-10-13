import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { PixelatedAnalyticsService } from './pixelatedAnalyticsService'

@Injectable()
export class GoogleAnalyticsService {

    private trackingId = 'UA-103414645-1';
    private gaUrl = 'https://www.google-analytics.com/collect?'

    constructor(public http: Http, public pAnalyticsService: PixelatedAnalyticsService) {
    }

    public trackPageView(pageName : string)
    {
        this.pAnalyticsService.trackPageView(pageName);
        var url = `${this.gaUrl}v=1&tid=${this.trackingId}&cid=555&t=pageview&dp=${pageName}`;
        this.http.post(url, '').toPromise().then();
    }

    public trackEvent(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: string)
    {
        this.pAnalyticsService.trackEvent(eventCategory, eventAction, eventLabel, eventValue);
        var url = `${this.gaUrl}v=1&tid=${this.trackingId}&cid=555&t=event&ec=${eventCategory}&ea=${eventAction}`;
        url += eventLabel && eventLabel !== "" ? `&el=${eventLabel}` : '';
        url += eventValue && eventValue !== "" ? `&ev=${eventValue}` : '';
        this.http.post(url, '').toPromise().then();
    }
}