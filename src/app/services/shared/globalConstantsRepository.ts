import {Injectable} from '@angular/core';
import {ILocation, IPhotographer} from '../workshops/workshopRepository'
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class GlobalConstantsRepository
{
    private cdnBaseUrl;
    private serviceBaseUrl;
    private pixelatedPlanetAPIUrl;
    private contactAPIUrl;
    private locationsUrl;
    private workshopTypesUrl;
    private photographersUrl;
    private locations:ILocation[];
    private workshopTypes:string[];
    private photographers:IPhotographer[];
    private locationMap: {[key: number]: ILocation} = {};
    private locationMapName:{[key: string]: ILocation} = {};

    constructor(private sanitizer:DomSanitizer)
    {
        this.cdnBaseUrl = `https://pixelatedplanetcdn.azureedge.net`;
        this.serviceBaseUrl = `https://pixelatedplanetservice.azurewebsites.net`;
        this.pixelatedPlanetAPIUrl = `${this.serviceBaseUrl}/api/Pixelated`;
        this.contactAPIUrl = `${this.pixelatedPlanetAPIUrl}/Contact`;
        this.locationsUrl = `${this.pixelatedPlanetAPIUrl}/Locations`;
        this.workshopTypesUrl = `${this.pixelatedPlanetAPIUrl}/WorkshopTypes`;
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

    public createWorkshopsUrl(page:number, startDate:string, endDate:string, minPrice:number, maxPrice:number, locations: string, categories: string) {
        let url = `/workshops/${page}?startDate=${startDate}&endDate=${endDate}`;
        url += minPrice ? `&minPrice=${minPrice}` : ``;
        url += maxPrice ? `&maxPrice=${maxPrice}` : ``;
        url += locations ? `&locations=${locations}` : ``;
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
        return this.sanitizeUrl(this.cdnBaseUrl + path);
    }

    public resolveLocalImageUrl(path:string)
    {
        return this.sanitizeUrl("/assets" + path);
    }

    public getLocations()
    {
        return this.locations;
    }
    
    public getWorkshopTypes()
    {
        return this.workshopTypes;
    }

    public setLocations(locations:ILocation[])
    {
        for (var i = 0; i < locations.length; i++) {
            var location = <ILocation>locations[i];
            this.locationMap[location.id] = location;
            this.locationMapName[location.name] = location;
        }

        this.locations = locations;
    }

    public setWorkshopTypes(workshopTypes:string[])
    {
        this.workshopTypes = workshopTypes;
    }
}