import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';

import { GlobalConstantsRepository } from '../shared/globalConstantsRepository'

export interface ILocation {
    id: number;
    name: string;
}

export interface IWorkshopOverview {
    workshopId: number,
    workshopType: string,
    numberOfWorkshops: number,
    startDateFirst?: Date,
    endDateFirst?: Date,
    minCost?: number,
    maxCost?: number,
    costCurrency?: string,
    name: string,
    imageLink: string,
    locationId: number,
    locationName: string,

    // following properties are set by the frontend
    detailsUrl: string,
    cardImageDefaultLink: string,
    cardImageCDNLink: string,
    startDateStr: string,
    endDateStr:string
}

export interface IWorkshopDto {
    workshops: IWorkshopOverview[],
    total: number
}

export interface IPhotographer {
    id: string;
    firstName: string;
    lastName: string;
    profilePhotoLink: string;
    websiteLink: string;
    locationId?: number;
    location: string;
    moreInfo: string;

    // following properties are set by the frontend
    profilePhotoCDNLink: string;
    externalWebsiteLink: string;
}

export interface IMultiWorkshopDetails {
    startDate: Date;
    endDate: Date;
    cost?: number;
    link: string;

    // following properties are set by the frontend
    externalLink: string;
    startDateStr: string;
    endDateStr: string;
}

export interface IWorkshopDetails {
    id: number;
    name: string;
    description: string;
    itinerary: IItinerary[];
    addtionalInformation: string;
    imageLink: string;
    link?: string;
    locationId: number;
    location: string;
    workshopType: string;
    multiWorkshopDetails: IMultiWorkshopDetails[];
    minCost: number;
    maxCost: number;
    costCurrency: string;
    photographers: IPhotographer[];
    images: string[];
}

export interface IItinerary {
    day: number;
    location: string;
    content: string;
}

@Injectable()
export class WorkshopRepository {

    public globalConstants;

    constructor(private http: Http, private globalConstantsRepository: GlobalConstantsRepository) {
        this.globalConstants = globalConstantsRepository;
        this.getLocations();
        this.getWorkshopTypes();
    }

    getWorkshopOverview(path: string, page: number, itemsPerPage: number): Promise<IWorkshopDto> {
        let query = `${path}&pageNumber=${page}&numberOfResults=${itemsPerPage}`;
        return this.http.get(query)
        .toPromise()
        .then(response => {
            return response.json();
        });
    }

    private getLocationsInternal(): Promise<ILocation[]> {
        return this.http.get(this.globalConstants.getLocationsUrl())
            .toPromise()
            .then(response => {
                return response.json() as ILocation[];
            });
    }

    getLocations(): Promise<ILocation[]> {
        let data = this.globalConstants.getLocations();
        if(data){
            return new Promise(function(resolve, reject) {
                resolve(data);
            });
        }
        else
        {
            return this.getLocationsInternal().then(locations =>
                {
                this.globalConstants.setLocations(locations);
                return locations;
                }
            );
        }
    }

    private getWorkshopTypesInternal(): Promise<string[]> {
        return this.http.get(this.globalConstants.getWorkshopTypesUrl())
            .toPromise()
            .then(response => {
                return response.json() as string[];
            });
    }

    getWorkshopTypes(): Promise<string[]> {
        let data = this.globalConstants.getWorkshopTypes();
        if(data) {
            return new Promise( function(resolve, reject) {
                resolve(data);
            });
        }
        else {
            let wTypes = this.getWorkshopTypesInternal().then(workshopTypes =>
                {
                this.globalConstants.setWorkshopTypes(workshopTypes);
                return workshopTypes;
                }
            );

            return wTypes;
        }
    }

    getWorkshopDetails(workshopId: string): Promise<IWorkshopDetails> {
        let url = `${this.globalConstants.getPixelatedPlanetAPIUrl()}/WorkshopDetails?workshopId=${workshopId}`;
        return this.http.get(url)
            .toPromise()
            .then(response => {
                return <IWorkshopDetails>response.json();
            });
    }
}