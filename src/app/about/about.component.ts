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
            { property: 'og:description', content: 'PixelatedPlanet enables aspiring photographers to find workshops and seminars all around the world being conducted by people successful in the field of photography. On the other hand, we provide a platform for photographers to showcase their photography workshops and reach interested folks.' },
            { name: 'twitter:description', content: 'PixelatedPlanet enables aspiring photographers to find workshops and seminars all around the world being conducted by people successful in the field of photography. On the other hand, we provide a platform for photographers to showcase their photography workshops and reach interested folks.' },
            { property: 'og:image', content: 'https://pixelatedplanetcdn.azureedge.net/img/yosemite.jpg' },
            { name: 'twitter:image', content: 'https://pixelatedplanetcdn.azureedge.net/img/yosemite.jpg' },
            { property: 'og:url', content: 'https://www.thepixelatedplanet.com/about' },
            { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/about' },
          ]);
    }
}