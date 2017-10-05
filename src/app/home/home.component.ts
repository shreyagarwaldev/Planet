import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { WorkshopsListComponent } from '../workshops-list/workshops-list.component'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

@ViewChild(WorkshopsListComponent) workshopsListChildComp:WorkshopsListComponent;

  private globalConstants : GlobalConstantsRepository;

  constructor(private globalConstantsRepository:GlobalConstantsRepository,
                public gaService : GoogleAnalyticsService,
                title: Title,
                meta: Meta) {
    this.globalConstants = globalConstantsRepository;
    this.gaService.trackPageView('Home');
    title.setTitle('Travel, Wildlife, Portrait, Street, etc. Photography Workshops')
    meta.addTags([
        { name: 'twitter:title', content: 'Photography Workshops - Pixelated Planet' },
        { property: 'og:title', content: 'Photography Workshops - Pixelated Planet' },
        { property: 'og:type', content: 'website'},
        { property: 'og:site_name', content: 'The Pixelated Planet'},
        { property: 'fb:app_id', content: '132676104124561'},
        { property: 'og:description', content: 'PixelatedPlanet enables aspiring photographers to find workshops and seminars all around the world being conducted by people successful in the field of photography. On the other hand, we provide a platform for photographers to showcase their photography workshops and reach interested folks.' },
        { name: 'twitter:description', content: 'PixelatedPlanet enables aspiring photographers to find workshops and seminars all around the world being conducted by people successful in the field of photography. On the other hand, we provide a platform for photographers to showcase their photography workshops and reach interested folks.' },
        { property: 'og:image', content: 'https://pixelatedplanetcdn.azureedge.net/img/yosemite.jpg' },
        { name: 'twitter:image', content: 'https://pixelatedplanetcdn.azureedge.net/img/yosemite.jpg' },
        { property: 'og:url', content: 'https://www.thepixelatedplanet.com/' },
        { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/' },
      ]);
  }

  ngOnInit() {
		var today = new Date();
		let startDate = `${today.getFullYear().toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;
		let endDate = `${(today.getFullYear()+10).toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;
		let query = `${this.globalConstants.getPixelatedPlanetAPIUrl()}/Workshops?startDateFilter=${startDate}&endDateFilter=${endDate}`;
		this.workshopsListChildComp.getWorkshopsData(query, 1, 4);
  }

  onViewAllClick() {
      this.gaService.trackEvent('ViewAll', 'Click');
  }
}
