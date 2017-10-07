import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})

export class AboutComponent {
    constructor(gaService : GoogleAnalyticsService, title: Title, meta: Meta) {
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
            { property: 'og:image', content: 'http://www.thepixelatedplanet.com/assets/img/yosemite.jpg' },
            { name: 'twitter:image', content: 'http://www.thepixelatedplanet.com/assets/img/yosemite.jpg' },
            { property: 'og:url', content: 'https://www.thepixelatedplanet.com/about' },
            { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/about' },
          ]);
    }
}