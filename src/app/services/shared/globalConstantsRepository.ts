import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {ILocation, IPhotographer} from '../workshops/workshopRepository'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Http } from '@angular/http'
import { UUID } from 'angular2-uuid';
import { isPlatformBrowser, JsonPipe } from '@angular/common';

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

        if(isPlatformBrowser(this.platformId) && localStorage.getItem('sessionId') 
        && localStorage.getItem('city') && localStorage.getItem('regionCode') && localStorage.getItem('countryCode')
        && localStorage.getItem('zip') && localStorage.getItem('ipAddress'))
        {
            this.sessionGUID = localStorage.getItem('sessionId');
            this.trackedLocation = <ILocationTracker>{};
            this.trackedLocation.city = localStorage.getItem('city');
            this.trackedLocation.regionCode = localStorage.getItem('regionCode');
            this.trackedLocation.countryCode = localStorage.getItem('countryCode');
            this.trackedLocation.zip = localStorage.getItem('zip');
            this.trackedLocation.ipAddress = localStorage.getItem('ipAddress');
        }
        else
        {
            this.sessionGUID = UUID.UUID();
            if(isPlatformBrowser(this.platformId))
            {
                localStorage.setItem('sessionId', this.sessionGUID);
            }

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

    public getTrackedLocation() {
        return this.trackedLocation;
    }

    public getSessionGUID() {
        return this.sessionGUID;
    }

    public getAnalyticsAPIUrl() {
        return this.analyticsAPIUrl;
    }

    public getFeedbackAPIUrl() {
        return this.feedbackAPIUrl;
    }

    public getSubscribeAPIUrl() {
        return this.subscribeAPIUrl;
    }

    public getContactAPIUrl()
    {
        return this.contactAPIUrl;
    }

    public getPixelatedPlanetAPIUrl()
    {
        return this.pixelatedPlanetAPIUrl;
    }

    public getLocationsUrl()
    {
        return this.locationsUrl;
    }

    sanitizeUrl(url: string) : SafeUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    public createWorkshopsUrl(page:number, startDate:string, endDate:string, minPrice:number, maxPrice:number, location: number, categories: string) {
        let url = `/photography-workshops/${page}?startDate=${startDate}&endDate=${endDate}`;
        url += minPrice ? `&minPrice=${minPrice}` : ``;
        url += maxPrice ? `&maxPrice=${maxPrice}` : ``;
        url += location ? `&locations=${location}` : ``;
        url += categories ? `&categories=${categories}` : ``;

        return url;
    }

    public getDefaultStartDate() {
        var today = new Date();
        return `${today.getFullYear().toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;
    }

    public getDefaultEndDate() {
        var today = new Date();
        return `${(today.getFullYear()+3).toString()}/12/31`;
    }

    public getWorkshopTypesUrl()
    {
        return this.workshopTypesUrl;
    }

    public resolveImageUrl(path:string)
    {
        return this.cdnBaseUrl + path;
    }

    public resolveLocalImageUrl(path:string)
    {
        return ("/assets" + path);
    }

    public getLocations()
    {
        if(isPlatformBrowser(this.platformId))
        {
            this.locations = JSON.parse(localStorage.getItem('locations'));
        }

        return this.locations;
    }
    
    public getWorkshopTypes()
    {
        if(isPlatformBrowser(this.platformId))
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