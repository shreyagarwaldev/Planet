import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { WorkshopRepository, IWorkshopOverview } from '../services/workshops/workshopRepository'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    selector: 'workshops-list',
    templateUrl: './workshops-list.component.html',
    styleUrls: ['./workshops-list.component.scss'],
})

export class WorkshopsListComponent {

    @Input() activePage: number;
    @Input() itemLimit: number;

    queryPath: string;
    itemsPerPage: number;
    imagesLoaded: boolean;
    loadedImageSet: Set<string>;
    workshopCount: number;

    asyncData: IWorkshopOverview[];
    page: number = 1;
    total: number;
    pageNumbers: number[];
    loading: boolean;
    workshops: IWorkshopOverview[];

    private cdRef: any;

    constructor(
        private workshopRepository: WorkshopRepository,
        private router: Router, cdRef: ChangeDetectorRef,
        private route:ActivatedRoute,
        public gaService: GoogleAnalyticsService) {

        this.loadedImageSet = new Set<string>();
        this.imagesLoaded = false;
        this.workshops = [];
        this.cdRef = cdRef;
    }

    ngOnInit() {
    }

    formatDate(date) {
        var monthNames = [
            "Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul",
            "Aug", "Sep", "Oct",
            "Nov", "Dec"
        ];
        var dateVal = new Date(date);
        var day = dateVal.getDate();
        var monthIndex = dateVal.getMonth();
        var year = dateVal.getFullYear().toString().substring(2);

        return `${monthNames[monthIndex]} ${day} '${year}`;
    }

    getWorkshopsData(path: string, page: number, wsPerPage: number) {
        this.loading = true;
        this.queryPath = path;
        this.itemsPerPage = wsPerPage;
        this.workshopRepository.getWorkshopOverview(path, page, wsPerPage)
            .then(res => {
                this.workshopCount = res.workshops.length;
                this.pageNumbers = Array(Math.ceil(res.total / wsPerPage)).fill(0).map((x, i) => i + 1);
                this.page = page;
                this.loading = false;
                this.asyncData = res.workshops;
                this.asyncData.forEach(w => {
                    w.workshopDetailsUrl = this.createWorkshopDetailsUrl(w.workshopId, w.name);
                    w.cardImageDefaultLink = this.getCardImageDefaultLink(w.workshopId);
                    w.cardImageCDNLink = this.getCardImageCDNLink(w.workshopId);
                    w.startDateFirstStr = this.formatDate(w.startDateFirst);
                    w.endDateFirstStr = this.formatDate(w.endDateFirst);
                });
            });

        this.cdRef.detectChanges();
    }

    createWorkshopDetailsUrl(workshopId: number, workshopName: string): string {
        workshopName = workshopName.replace(/[ ()&/\#]/g, "-");
        return `/photography-workshop-details/${workshopName}/${workshopId}`;
    }

    createPageLink(pageNumber: number): string {
        return this.createUrl(pageNumber);
    }
    
    createUrl(page : number) : string {
        let queryParams = this.route.snapshot.queryParams;
        let location: number = Number(queryParams['locations']);
        let category: string = queryParams['categories'];
        let minPrice: string = queryParams['minPrice'];
        let maxPrice: string = queryParams['maxPrice'];
        let startDate: string = queryParams['startDate'];
        let endDate: string = queryParams['endDate'];
        location = location === NaN ? undefined : location;
        let today = new Date();
        startDate = !startDate ? this.workshopRepository.globalConstants.getDefaultStartDate() : startDate;
        endDate = !endDate ? this.workshopRepository.globalConstants.getDefaultEndDate() : endDate;

        return this.workshopRepository.globalConstants.createWorkshopsUrl(page, startDate, endDate, minPrice, maxPrice, location, category);
    }

    imageLoaded(id: string) {
        this.loadedImageSet.add(id);
        if(this.loadedImageSet.size == this.workshopCount)
        {
            this.imagesLoaded = true;
        }
    }

    onSelectWorkshop(workshopId: number) {
        this.gaService.trackEvent('WorkshopInstance','Click',`${workshopId}`);
    }
    
    getCardImageCDNLink(workshopId: number) {
        return this.workshopRepository.globalConstants.resolveImageUrl(`/img/Tiles/${workshopId}.jpg`);
    }

    getCardImageLocalLink(workshopId: number) {
        return this.workshopRepository.globalConstants.resolveLocalImageUrl(`/img/Tiles/${workshopId}.jpg`);
    }

    getCardImageDefaultLink(workshopId: number) {
        return this.workshopRepository.globalConstants.resolveImageUrl(`/img/default/${workshopId}.jpg`);
    }
}