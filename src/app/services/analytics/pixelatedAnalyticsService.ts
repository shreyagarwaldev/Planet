import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConstantsRepository, ILocationTracker } from '../shared/globalConstantsRepository'

@Injectable()
export class PixelatedAnalyticsService {

    constructor(public http: Http, public globalConstants: GlobalConstantsRepository) {
    }

    public trackPageView(pageName : string)
    {
        this.trackEvent("PageView", pageName);
    }

    public trackEvent(eventCategory: string, eventAction: string, eventLabel?: string, eventValue?: string)
    {
        var url = `${this.globalConstants.getAnalyticsAPIUrl()}?id=${this.globalConstants.getSessionGUID()}&ec=${eventCategory}&ea=${eventAction}`;
        url += eventLabel && eventLabel !== "" ? `&el=${eventLabel}` : '';
        url += eventValue && eventValue !== "" ? `&ev=${eventValue}` : '';

        var trackedLocation = this.globalConstants.getTrackedLocation();
        if(trackedLocation)
        {
            this.http.post(url, trackedLocation).toPromise().then().catch();
        }
        else
        {
            this.http.get('http://ip-api.com/json').toPromise().then(response => {
                trackedLocation = <ILocationTracker>{};
                trackedLocation.city = response.json()["city"];
                trackedLocation.regionCode = response.json()["region"];
                trackedLocation.countryCode = response.json()["countryCode"];
                trackedLocation.zip = response.json()["zip"];
                trackedLocation.ipAddress = response.json()["query"];

                this.http.post(url, trackedLocation).toPromise().then().catch();
            }).catch(e => { 
                trackedLocation = <ILocationTracker>{}
                this.http.post(url, trackedLocation).toPromise().then().catch();
            });
        }
    }
}