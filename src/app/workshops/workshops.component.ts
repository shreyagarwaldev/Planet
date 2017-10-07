import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { WorkshopsListComponent } from '../workshops-list/workshops-list.component';
import { WorkshopFilterComponent } from '../workshop-filter/workshop-filter.component';
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService';

@Component({
    templateUrl: './workshops.component.html',
    styleUrls: ['./workshops.component.scss']
})
export class WorkshopsComponent {
    private query: string;
    private startDate: string;
    private endDate: string;
    private locationId: number;
    private categoryList: string;
    private minPrice: number;
    private maxPrice: number;
    hideFilter: boolean;
    pageNumber: number;

    private readonly workshopsPerPage: number = 8;

    private globalConstants: GlobalConstantsRepository;

    @ViewChild(WorkshopsListComponent) workshopsListChildComp: WorkshopsListComponent;
    @ViewChild(WorkshopFilterComponent) workshopsFilterChildComp: WorkshopFilterComponent;

    constructor(
        private globalConstantsRepository: GlobalConstantsRepository,
        private route: ActivatedRoute,
        private router: Router,
        title: Title,
        meta: Meta,
        public gaService: GoogleAnalyticsService) {
        this.globalConstants = globalConstantsRepository;
        this.hideFilter = true;

        this.gaService.trackPageView('Workshops');

        title.setTitle('List of Photography Workshops');
        meta.addTags([
            { name: 'twitter:title', content: 'List of Photography Workshops' },
            { property: 'og:title', content: 'List of Photography Workshops' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'The Pixelated Planet' },
            { property: 'fb:app_id', content: '132676104124561' },
            { name: 'description', content: 'Photography workshops list which can be filtered on by Location, Category, Dates and Price' },
            { property: 'og:description', content: 'Photography workshops list which can be filtered on by Location, Category, Dates and Price' },
            { name: 'twitter:description', content: 'Photography workshops list which can be filtered on by Location, Category, Dates and Price' },
            { property: 'og:image', content: 'http://pixelatedplanetcdn.azureedge.net/img/yosemite.jpg' },
            { name: 'twitter:image', content: 'http://pixelatedplanetcdn.azureedge.net/img/yosemite.jpg' },
            { property: 'og:url', content: `https://www.thepixelatedplanet.com${this.router.url}` },
            { name: 'twitter:site', content: `https://www.thepixelatedplanet.com${this.router.url}` },
        ]);

        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.setParameters();
                this.updateUrl();
            }
        });
    }

    toggleFilterDropdown(event: any) {
        this.hideFilter = event;
    }

    setParameters() {
        this.pageNumber = this.route.snapshot.params['pageNumber'];
        let queryParams = this.route.snapshot.queryParams;
        this.locationId = Number(queryParams['locations']);
        this.categoryList = queryParams['categories'];
        this.minPrice = queryParams['minPrice'];
        this.maxPrice = queryParams['maxPrice'];
        this.startDate = queryParams['startDate'];
        this.endDate = queryParams['endDate'];

        this.locationId = this.locationId === NaN ? undefined : this.locationId;
        this.startDate = !this.startDate ? this.globalConstants.getDefaultStartDate() : this.startDate;
        this.endDate = !this.endDate ? this.globalConstants.getDefaultEndDate() : this.endDate;

        this.workshopsFilterChildComp.setValuesFromParameters(this.minPrice, this.maxPrice, this.categoryList, this.locationId, this.startDate, this.endDate);
    }

    ngOnInit() {
        this.setParameters();
        this.updateUrl();
    }

    ngOnDestroy() {
    }

    createUrl(): string {
        let url = `/workshops/${this.pageNumber}?startDate=${this.startDate}&endDate=${this.endDate}`;
        url += this.minPrice ? `&minPrice=${this.minPrice}` : ``;
        url += this.maxPrice ? `&maxPrice=${this.maxPrice}` : ``;
        url += this.locationId ? `&locations=${this.locationId}` : ``;
        url += this.categoryList ? `&categories=${this.categoryList}` : ``;
        return url;
    }

    updateUrl() {

        this.startDate = !this.startDate ? this.globalConstants.getDefaultStartDate() : this.startDate;
        this.endDate = !this.endDate ? this.globalConstants.getDefaultEndDate() : this.endDate;
        this.query = `${this.globalConstants.getPixelatedPlanetAPIUrl()}/Workshops?startDateFilter=${this.startDate}&endDateFilter=${this.endDate}`;
        this.query += this.locationId && this.locationId ? `&locationIdFilter=${this.locationId}` : ``;
        this.query += this.categoryList && this.categoryList != "" ? `&workshopType=${this.categoryList}` : ``;
        this.query += this.minPrice && this.minPrice > 0 ? `&minPrice=${this.minPrice.toString()}` : ``;
        this.query += this.maxPrice && this.maxPrice > 0 ? `&maxPrice=${this.maxPrice.toString()}` : ``;

        if (this.query && this.pageNumber) {
            this.workshopsListChildComp.getWorkshopsData(this.query, this.pageNumber, this.workshopsPerPage);
        }
    }

    performNav() {
        this.pageNumber = 1;
        this.router.navigateByUrl(this.globalConstants.createWorkshopsUrl(this.pageNumber, this.startDate, this.endDate, this.minPrice, this.maxPrice, this.locationId, this.categoryList));
    }

    setFromDate(selectedDate: Array<Date>) {
        let previousStartDate = this.startDate;
        let previousEndDate = this.endDate;
        let fromDate = selectedDate[0];
        let toDate = selectedDate[1];
        this.startDate = `${fromDate.getFullYear()}/${fromDate.getMonth() + 1}/${fromDate.getDate()}`;
        this.endDate = `${toDate.getFullYear()}/${toDate.getMonth() + 1}/${toDate.getDate()}`;

        if (this.startDate == "0/0/0") {
            this.startDate = this.globalConstants.getDefaultStartDate();
        }

        if (this.endDate == "0/0/0") {
            this.endDate = this.globalConstants.getDefaultEndDate();
        }


        if (previousStartDate !== this.startDate || previousEndDate !== this.endDate) {
            this.performNav();
        }
    }

    toggleFilter() {
        this.hideFilter = true;
    }

    setLocationIdList(locationId: number) {
        if (locationId !== this.locationId) {
            this.locationId = locationId;
            this.performNav();
        }
    }

    setCategoryList(category: string) {
        if (category != this.categoryList) {
            this.categoryList = category;
            this.performNav();
        }
    }

    setMinPrice(minPrice: number) {
        if (this.minPrice != minPrice) {
            this.minPrice = minPrice;
            this.performNav();
        }
    }

    setMaxPrice(maxPrice: number) {
        if (this.maxPrice != maxPrice) {
            this.maxPrice = maxPrice;
            this.performNav();
        }
    }
}