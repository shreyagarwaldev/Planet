import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd } from '@angular/router';
import { WorkshopsListComponent } from '../workshops-list/workshops-list.component'
import { WorkshopFilterComponent } from '../workshop-filter/workshop-filter.component'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'

declare var gtag : any;

@Component({
    templateUrl: './workshops.component.html',
    styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent {
	private query: string;
	private startDate: string;
	private endDate: string;
	private locationIdList:string;
	private categoryList:string;
	private minPrice:number;
	private maxPrice:number;
    hideFilter: boolean;
    pageNumber: number;

	private readonly workshopsPerPage: number = 8;	
	
	private globalConstants:GlobalConstantsRepository;
	
	@ViewChild(WorkshopsListComponent) workshopsListChildComp:WorkshopsListComponent;
	@ViewChild(WorkshopFilterComponent) workshopsFilterChildComp:WorkshopFilterComponent;

	constructor(private globalConstantsRepository:GlobalConstantsRepository, private route:ActivatedRoute, private router:Router)
	{
		this.globalConstants = globalConstantsRepository;
        this.hideFilter = true;
        
        router.events.subscribe(event => {
            if(event instanceof NavigationEnd)
                {
            this.setParameters();
            this.updateUrl();
                }
        });
    }

    toggleFilterDropdown(event: any) {
        this.hideFilter = event;
    }
    
    setParameters() {
        this.route.params.subscribe(params => {
            this.pageNumber = params['pageNumber'];
        });

        this.route.queryParams.subscribe(params => {
            this.locationIdList = params['locations'];
            this.categoryList = params['categories'];
            this.minPrice = params['minPrice'];
            this.maxPrice = params['maxPrice'];
            this.startDate = params['startDate'];
            this.endDate = params['endDate'];
        });

        this.startDate = !this.startDate ? this.globalConstants.getDefaultStartDate() : this.startDate;
        this.endDate = !this.endDate ? this.globalConstants.getDefaultEndDate() : this.endDate;

        this.workshopsFilterChildComp.setValuesFromParameters(this.minPrice, this.maxPrice, this.categoryList, this.locationIdList, this.startDate, this.endDate);
    }
	
	ngOnInit() {
        this.setParameters();
		this.updateUrl();
    }
    
    createUrl() : string {
        let url = `/workshops/${this.pageNumber}?startDate=${this.startDate}&endDate=${this.endDate}`;
        url += this.minPrice ? `&minPrice=${this.minPrice}` : ``;
        url += this.maxPrice ? `&maxPrice=${this.maxPrice}` : ``;
        url += this.locationIdList ? `&locations=${this.locationIdList}` : ``;
        url += this.categoryList ? `&categories=${this.categoryList}` : ``;

        return url;
    }
	
	updateUrl()
	{
        this.query = `${this.globalConstants.getPixelatedPlanetAPIUrl()}/Workshops?startDateFilter=${this.startDate}&endDateFilter=${this.endDate}`;
        this.query += this.locationIdList && this.locationIdList != "" ? `&locationIdFilter=${this.locationIdList}` : ``;
        this.query += this.categoryList && this.categoryList != "" ? `&workshopType=${this.categoryList}` : ``;
        this.query += this.minPrice && this.minPrice > 0 ? `&minPrice=${this.minPrice.toString()}` : ``;
        this.query += this.maxPrice && this.maxPrice > 0 ? `&maxPrice=${this.maxPrice.toString()}` : ``;
        
		if(this.query && this.pageNumber) {
            // log gtag event
            gtag('event', 'filter', {
                'pageNumber' : `${this.pageNumber}`,
                'startDate' : `${this.startDate}`,
                'endDate' : `${this.endDate}`,
                'location' : `${this.locationIdList}`,
                'categoryList' : `${this.categoryList}`,
                'minPrice' : `${this.minPrice}`,
                'maxPrice' : `${this.maxPrice}`
            });

            // update list component
			this.workshopsListChildComp.getWorkshopsData(this.query, this.pageNumber, this.workshopsPerPage);
		}
    }
    
    performNav() {
        this.pageNumber = 1;
        this.router.navigateByUrl(this.globalConstants.createWorkshopsUrl(this.pageNumber, this.startDate, this.endDate, this.minPrice, this.maxPrice, this.locationIdList, this.categoryList));
        ;
    }

    setFromDate(fromDate: any)
	{
        let previousStartDate = this.startDate;
        this.startDate = `${fromDate.year}/${fromDate.month}/${fromDate.day}`;
		if(this.startDate == "0/0/0")
		{
            this.startDate = this.globalConstants.getDefaultStartDate();
		}
        
        if(previousStartDate !== this.startDate)
        {
         this.performNav();   
        }
    }

	toggleFilter() {
		this.hideFilter = true;
	}
	
	setToDate(toDate: any)
	{
        let previousEndDate = this.endDate;
        this.endDate = `${toDate.year}/${toDate.month}/${toDate.day}`;
		if(this.endDate == "0/0/0")
		{
            this.endDate = this.globalConstants.getDefaultEndDate();
		}

        if(previousEndDate != this.endDate)
        {
            this.performNav();
        }
    }
	
	setLocationIdList(locationIdList: any)
	{
        if(locationIdList != this.locationIdList)
        {
            this.locationIdList = locationIdList;
            this.performNav();
        }
	}
	
	setCategoryList(category: string)
	{
        if(category != this.categoryList)
        {
            this.categoryList = category;
            this.performNav();
        }
	}
	
	setMinPrice(minPrice: number)
	{
        if(this.minPrice != minPrice)
        {
            this.minPrice = minPrice;
            this.performNav();
        }
	}
	
	setMaxPrice(maxPrice: number)
	{
        if(this.maxPrice != maxPrice)
        {
            this.maxPrice = maxPrice;
            this.performNav();
        }
	}
}