import { Component, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent {
    constructor(gaService : GoogleAnalyticsService, title: Title, public meta: Meta) {
        gaService.trackPageView('About');
        title.setTitle('About Pixelated Planet, the photographers and their workshop listings')
        meta.addTags([
            { name: 'twitter:title', content: 'About Pixelated Planet' },
            { property: 'og:title', content: 'About Pixelated Planet' },
            { property: 'og:type', content: 'article'},
            { property: 'og:site_name', content: 'The Pixelated Planet'},
            { property: 'fb:app_id', content: '132676104124561'},
            { name: 'description', content: `Enabling aspiring photographers to find workshops in travel, nature, wildlife, street, portrait, etc photography while providing a platform for photographers' workshops` },
            { property: 'og:description', content: `Enabling aspiring photographers to find workshops in travel, nature, wildlife, street, portrait, etc photography while providing a platform for photographers' workshops` },
            { name: 'twitter:description', content: `Enabling aspiring photographers to find workshops in travel, nature, wildlife, street, portrait, etc photography while providing a platform for photographers' workshops` },
            { property: 'og:image', content: 'http://www.piplanet-shrey.herokuapp.com/assets/img/yosemite.jpg' },
            { name: 'twitter:image', content: 'http://www.piplanet-shrey.herokuapp.com/assets/img/yosemite.jpg' },
            { property: 'og:url', content: 'https://www.piplanet-shrey.herokuapp.com/about' },
            { name: 'twitter:site', content: 'https://www.piplanet-shrey.herokuapp.com/about' },
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