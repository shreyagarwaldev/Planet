import {Injectable, PLATFORM_ID, Inject} from '@angular/core';
import {ILocation, IPhotographer} from '../workshops/workshopRepository'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Http } from '@angular/http'
import { UUID } from 'angular2-uuid';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class GlobalConstantsRepository
{
    private cdnBaseUrl;
    private serviceBaseUrl;
    private pixelatedPlanetAPIUrl;
    private contactAPIUrl;
    private analyticsAPIUrl;
    private verifyEmailAPIUrl;
    private subscribeAPIUrl;
    private feedbackAPIUrl;
    private locationsUrl;
    private sessionGUID;
    private workshopTypesUrl;
    private photographersUrl;
    private ipAddress;
    private locations:ILocation[];
    private workshopTypes:string[];
    private photographers:IPhotographer[];

    constructor(@Inject(PLATFORM_ID) public platformId: string, private sanitizer:DomSanitizer, private http: Http)
    {
        this.cdnBaseUrl = `https://pixelatedplanetcdn.azureedge.net`;
        this.serviceBaseUrl = `https://pixelatedplanetservice.azurewebsites.net`;
        this.pixelatedPlanetAPIUrl = `${this.serviceBaseUrl}/api/Pixelated`;
        this.analyticsAPIUrl = `${this.pixelatedPlanetAPIUrl}/analytics`;
        this.verifyEmailAPIUrl = `${this.pixelatedPlanetAPIUrl}/verifyemail`;
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
            
            if(localStorage.getItem('ipAddress'))
            {
                this.ipAddress = localStorage.getItem('ipAddress');
            }
        }
        else
        {
            http.get('https://api.ipify.org?format=json').toPromise().then(response => {
                    this.ipAddress = response.json()["ip"];
                    if(isPlatformBrowser(this.platformId))
                    {            
                        localStorage.setItem('ipAddress', this.ipAddress);
                    }
            }).catch(e => {
            });
        }
    }

    public getVerifyEmailAPIUrl() : string {
        return this.verifyEmailAPIUrl;
    }

    public getIPAddress() : string {
        return this.ipAddress;
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