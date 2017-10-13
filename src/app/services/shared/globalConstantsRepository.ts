import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {ILocation, IPhotographer} from '../workshops/workshopRepository'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Http } from '@angular/http'
import { UUID } from 'angular2-uuid';
import { isPlatformBrowser } from '@angular/common';

export interface ILocationTracker {
    ipAddress: string,
    countryCode: string,
    regionCode: string,
    city: string,
    zip: string
}

@Injectable()
export class GlobalConstantsRepository
{
    private cdnBaseUrl;
    private serviceBaseUrl;
    private pixelatedPlanetAPIUrl;
    private contactAPIUrl;
    private analyticsAPIUrl;
    private subscribeAPIUrl;
    private feedbackAPIUrl;
    private locationsUrl;
    private sessionGUID;
    private workshopTypesUrl;
    private photographersUrl;
    private trackedLocation;
    private locations:ILocation[];
    private workshopTypes:string[];
    private photographers:IPhotographer[];

    constructor(@Inject(PLATFORM_ID) public platformId: string, private sanitizer:DomSanitizer, private http: Http)
    {
        this.cdnBaseUrl = `https://pixelatedplanetcdn.azureedge.net`;
        this.serviceBaseUrl = `https://pixelatedplanetservice.azurewebsites.net`;
        this.pixelatedPlanetAPIUrl = `${this.serviceBaseUrl}/api/Pixelated`;
        this.analyticsAPIUrl = `${this.pixelatedPlanetAPIUrl}/analytics`;
        this.contactAPIUrl = `${this.pixelatedPlanetAPIUrl}/Contact`;
        this.feedbackAPIUrl = `${this.pixelatedPlanetAPIUrl}/feedback`;
        this.subscribeAPIUrl = `${this.pixelatedPlanetAPIUrl}/addemail`;
        this.locationsUrl = `${this.pixelatedPlanetAPIUrl}/Locations`;
        this.workshopTypesUrl = `${this.pixelatedPlanetAPIUrl}/WorkshopTypes`;

        if(isPlatformBrowser(this.platformId))
        {
            if(localStorage.getItem('sessionId'))
            {
                this.sessionGUID = localStorage.getItem('sessionId');
            }

            if(localStorage.getItem('workshopTypes'))
            {
                this.workshopTypes = JSON.parse(localStorage.getItem('workshopTypes'));
            }

            if(localStorage.getItem('locations'))
            {
                this.locations = JSON.parse(localStorage.getItem('locations'));
            }
            
            if(localStorage.getItem('city') && localStorage.getItem('regionCode') && localStorage.getItem('countryCode')
                && localStorage.getItem('zip') && localStorage.getItem('ipAddress'))
            {
                this.trackedLocation = <ILocationTracker>{};
                this.trackedLocation.city = localStorage.getItem('city');
                this.trackedLocation.regionCode = localStorage.getItem('regionCode');
                this.trackedLocation.countryCode = localStorage.getItem('countryCode');
                this.trackedLocation.zip = localStorage.getItem('zip');
                this.trackedLocation.ipAddress = localStorage.getItem('ipAddress');
            }
        }
        else
        {
            http.get('http://ip-api.com/json').toPromise().then(response => {
                this.trackedLocation = <ILocationTracker>{};
                this.trackedLocation.city = response.json()["city"];
                this.trackedLocation.regionCode = response.json()["region"];
                this.trackedLocation.countryCode = response.json()["countryCode"];
                this.trackedLocation.zip = response.json()["zip"];
                this.trackedLocation.ipAddress = response.json()["query"];
                if(isPlatformBrowser(this.platformId))
                {            
                    localStorage.setItem('city', this.trackedLocation);
                    localStorage.setItem('regionCode', this.trackedLocation.regionCode);
                    localStorage.setItem('countryCode', this.trackedLocation.countryCode);
                    localStorage.setItem('zip', this.trackedLocation.zip);
                    localStorage.setItem('ipAddress', this.trackedLocation.ipAddress);
                }
            }).catch(e => {
                this.trackedLocation = <ILocationTracker>{};
            });
        }
    }

    public getTrackedLocation() : ILocationTracker {
        return this.trackedLocation;
    }

    public getSessionGUID() : string {
        if(isPlatformBrowser(this.platformId) && localStorage.getItem('sessionId'))
        {
            this.sessionGUID = localStorage.getItem('sessionId');
        }

        if(!this.sessionGUID)
        {
            this.sessionGUID = UUID.UUID();
            if(isPlatformBrowser(this.platformId))
            {
                localStorage.setItem('sessionId', this.sessionGUID);
            }
        }

        return this.sessionGUID;
    }

    public getAnalyticsAPIUrl() : string {
        return this.analyticsAPIUrl;
    }

    public getFeedbackAPIUrl() : string {
        return this.feedbackAPIUrl;
    }

    public getSubscribeAPIUrl() : string {
        return this.subscribeAPIUrl;
    }

    public getContactAPIUrl() : string
    {
        return this.contactAPIUrl;
    }

    public getPixelatedPlanetAPIUrl() : string
    {
        return this.pixelatedPlanetAPIUrl;
    }

    public getLocationsUrl() : string
    {
        return this.locationsUrl;
    }

    sanitizeUrl(url: string) : SafeUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    public createWorkshopsUrl(page:number, startDate:string, endDate:string, minPrice:number, maxPrice:number, location: number, categories: string) : string {
        let url = `/photography-workshops/${page}?startDate=${startDate}&endDate=${endDate}`;
        url += minPrice ? `&minPrice=${minPrice}` : ``;
        url += maxPrice ? `&maxPrice=${maxPrice}` : ``;
        url += location ? `&locations=${location}` : ``;
        url += categories ? `&categories=${categories}` : ``;

        return url;
    }

    public getDefaultStartDate() : string {
        var today = new Date();
        return `${today.getFullYear().toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;
    }

    public getDefaultEndDate() : string {
        var today = new Date();
        return `${(today.getFullYear()+3).toString()}/12/31`;
    }

    public getWorkshopTypesUrl() : string
    {
        return this.workshopTypesUrl;
    }

    public resolveImageUrl(path:string) : string
    {
        return this.cdnBaseUrl + path;
    }

    public resolveLocalImageUrl(path:string) : string
    {
        return ("/assets" + path);
    }

    public getLocations() : ILocation[]
    {
        if(isPlatformBrowser(this.platformId) && localStorage.getItem('locations'))
        {
            this.locations = JSON.parse(localStorage.getItem('locations'));
        }

        return this.locations;
    }
    
    public getWorkshopTypes() : string[]
    {
        if(isPlatformBrowser(this.platformId) && localStorage.getItem('workshopTypes'))
        {
            this.workshopTypes = JSON.parse(localStorage.getItem('workshopTypes'));
        }

        return this.workshopTypes;
    }

    public setLocations(locations:ILocation[])
    {
        for (var i = 0; i < locations.length; i++) {
            var location = <ILocation>locations[i];
        }

        this.locations = locations;
        if(isPlatformBrowser(this.platformId))
        {
            localStorage.setItem('locations', JSON.stringify(this.locations));
        }
    }

    public setWorkshopTypes(workshopTypes:string[])
    {
        this.workshopTypes = workshopTypes;
        if(isPlatformBrowser(this.platformId))
        {
            localStorage.setItem('workshopTypes', JSON.stringify(this.workshopTypes));
        }
    }
}