import { Component, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
    constructor(gaService : GoogleAnalyticsService,
                title:Title,
                public meta: Meta) {
        gaService.trackPageView('404');
        title.setTitle('Page Not Found - Pixelated Planet')
        meta.addTags([
            { name: 'twitter:title', content: 'Page Not Found - Pixelated Planet' },
            { property: 'og:title', content: 'Page Not Found - Pixelated Planet' },
            { property: 'og:type', content: 'website'},
            { property: 'og:site_name', content: 'The Pixelated Planet'},
            { property: 'fb:app_id', content: '132676104124561'},
            { name: 'description', content: 'You tried accessing a page that does not exist.' },
            { property: 'og:description', content: 'You tried accessing a page that does not exist.' },
            { name: 'twitter:description', content: 'You tried accessing a page that does not exist.' },
            { property: 'og:image', content: 'http://www.piplanet-shrey.herokuapp.com/assets/img/yosemite.jpg' },
            { name: 'twitter:image', content: 'http://www.piplanet-shrey.herokuapp.com/assets/img/yosemite.jpg' },
            { property: 'og:url', content: 'https://www.piplanet-shrey.herokuapp.com/404' },
            { name: 'twitter:site', content: 'https://www.piplanet-shrey.herokuapp.com/404' },
          ]);
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
}