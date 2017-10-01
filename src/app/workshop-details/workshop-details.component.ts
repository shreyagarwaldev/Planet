import { Component, OnInit, ElementRef, ChangeDetectionStrategy, Renderer } from '@angular/core';
import { WorkshopRepository, IWorkshopDetails } from '../services/workshops/workshopRepository'
import { ActivatedRoute } from '@angular/router';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

export interface IImageObject {
    imageLink: string;
    hideImage: boolean
}

interface ITabs {
    label: string;
    showTab: boolean;
}

@Component({
    templateUrl: './workshop-details.component.html',
    styleUrls: ['./workshop-details.component.scss']
})

export class WorkshopDetailsComponent {
    workshopDetails: IWorkshopDetails;
    imagesLink: IImageObject[];
    hideModal: boolean;
    private slideIndex: number;
    private sub: any;
    tabs: ITabs[];
    workshopId:string;

    workshopRepository : WorkshopRepository;
    private previousActiveTab: ITabs;
    private tabcontent: HTMLCollectionOf<HTMLElement>;
    private tabLinks: HTMLCollectionOf<HTMLElement>;

    arrowKeyfunction: Function;

    constructor(
        workshopRepo: WorkshopRepository,
        private elementRef: ElementRef,
        private route: ActivatedRoute,
        private renderer: Renderer,
        public gaService: GoogleAnalyticsService) {
        this.workshopRepository = workshopRepo;
        this.workshopDetails = <any>{};
        this.hideModal = true;

        this.gaService.trackPageView('WorkshopDetails');
        
        this.slideIndex = 1;
        this.arrowKeyfunction = renderer.listenGlobal('document', 'keyup', (event) => {
            if(event.keyCode === 39) {
                this.plusSlides(-1);
            } else if (event.keyCode === 37) {
                this.plusSlides(1);
            }
        })
    }

    ngOnInit() {
        this.hideModal = true;
        this.sub = this.route.params.subscribe(params => {
            this.workshopId = params['id'];
        });
        this.getWorkshopDetail(this.workshopId);
        this.initializeTabs();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
        this.arrowKeyfunction();
    }

    createExternalLink(url: string)
    {
        let encodedUri = encodeURI(url);
        encodedUri = encodedUri.replace(new RegExp('/', 'g'), '%2F').replace(new RegExp(':', 'g'),'%3A')
                    .replace(new RegExp('[?]', 'g'),'%3F').replace(new RegExp(';','g'),'%3B').replace(new RegExp(',', 'g'),'%2C')
                    .replace(new RegExp('@','g'),'%40').replace(new RegExp('&', 'g'),'%26').replace(new RegExp('=', 'g'),'%3D')
                    .replace(new RegExp('[+]','g'),'%2B');
                    
        return `/page-redirect/${encodedUri}`;
    }

    clickExternalLink(url: string) {
        this.gaService.trackEvent('ExternalWorkshopLink', 'Click', '', `${this.workshopId}`);
    }

    onPhotographerWebsiteClick(photographerId: string) {
        this.gaService.trackEvent('ExternalPhotographerLink', 'Click', '', `${photographerId}`);
    }

    getWorkshopDetail(workshopId: string) {
        this.workshopRepository.getWorkshopDetails(workshopId)
            .then(data => {
                this.workshopDetails = data;
                this.getImgData();
            });
    }

    closeModal() {
        this.hideModal = true;
    }

    openModal(index: number) {
        this.hideModal = false;
        this.currentSlide(index);
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    showSlides(n) {
        const totalImages = this.imagesLink.length;
        if (n > totalImages) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = totalImages - 1 }
        for (let i = 0; i < totalImages; i++) {
            this.imagesLink[i].hideImage = true;
        }
        this.imagesLink[this.slideIndex - 1].hideImage = false;
    }


    getImgData() {
        this.imagesLink = [];
        this.workshopDetails.images.forEach(imagePath => {
            var imgObj = <IImageObject>{};
            imgObj.imageLink = this.workshopRepository.globalConstants.resolveImageUrl(imagePath);
            imgObj.hideImage = true;
            this.imagesLink.push(imgObj);
        });
    }

    getCoverImageCDNLink() {
        return this.workshopRepository.globalConstants.resolveImageUrl(`/img/Cover/${this.workshopId}.jpg`);
    }

    getCoverImageLocalLink() {
        return this.workshopRepository.globalConstants.resolveLocalImageUrl(`/img/Cover/${this.workshopId}.jpg`);
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
        var year = dateVal.getFullYear();

        return `${monthNames[monthIndex]} ${day} ${year}`;
    }


    initializeTabs() {
        this.tabs = [
            {
                label: "Description",
                showTab: false
            },
            {
                label: "Gallery",
                showTab: false
            },
            {
                label: "Photographers",
                showTab: false
            }
        ]

        this.previousActiveTab = this.tabs[0];
        this.previousActiveTab.showTab = true;
    }

    openTabs(tabNumber: number) {
        this.previousActiveTab.showTab = false;
        this.tabs[tabNumber].showTab = true;
        this.previousActiveTab = this.tabs[tabNumber];
    }
}