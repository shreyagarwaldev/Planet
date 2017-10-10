import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
                public meta: Meta) {
    this.globalConstants = globalConstantsRepository;
    this.gaService.trackPageView('Home');
    title.setTitle('Travel, Wildlife, Portrait, Street, etc. Photography Workshops')
    // meta.addTags([
    //     { name: 'twitter:title', content: 'Photography Workshops - Pixelated Planet' },
    //     { property: 'og:title', content: 'Photography Workshops - Pixelated Planet' },
    //     { property: 'og:type', content: 'website'},
    //     { property: 'og:site_name', content: 'The Pixelated Planet'},
    //     { property: 'fb:app_id', content: '132676104124561'},
    //     { name: 'description', content: `Enabling aspiring photographers to find workshops in travel, nature, wildlife, street, portrait, etc photography while providing a platform for photographers' workshops` },
    //     { property: 'og:description', content: `Enabling aspiring photographers to find workshops in travel, nature, wildlife, street, portrait, etc photography while providing a platform for photographers' workshops` },
    //     { name: 'twitter:description', content: `Enabling aspiring photographers to find workshops in travel, nature, wildlife, street, portrait, etc photography while providing a platform for photographers' workshops` },
    //     { property: 'og:image', content: 'http://www.piplanet-shrey.herokuapp.com/assets/img/yosemite.jpg' },
    //     { name: 'twitter:image', content: 'http://www.piplanet-shrey.herokuapp.com/assets/img/yosemite.jpg' },
    //     { property: 'og:url', content: 'https://www.piplanet-shrey.herokuapp.com/' },
    //     { name: 'twitter:site', content: 'https://www.piplanet-shrey.herokuapp.com/' },
    //   ]);
  }

  ngOnDestroy() {
    this.meta.removeTag("name='twitter:title'");
    this.meta.removeTag("property='og:title'");
    this.meta.removeTag("property='og:type'");
    this.meta.removeTag("property='og:site_name'");
    this.meta.removeTag("property='fb:app_id'");
    this.meta.removeTag("name='description'");
    this.meta.removeTag("property='og:description'");
    this.meta.removeTag("name='twitter:description'");
    this.meta.removeTag("property='og:image'");
    this.meta.removeTag("name='twitter:image'");
    this.meta.removeTag("property='og:url'");
    this.meta.removeTag("name='twitter:site'");
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
