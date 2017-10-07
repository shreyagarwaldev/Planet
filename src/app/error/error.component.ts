import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser'
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService'

@Component({
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss']
})

export class ErrorComponent {
    constructor(gaService : GoogleAnalyticsService,
                title:Title,
                meta: Meta) {
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
            { property: 'og:image', content: 'http://www.thepixelatedplanet.com/assets/img/yosemite.jpg' },
            { name: 'twitter:image', content: 'http://www.thepixelatedplanet.com/assets/img/yosemite.jpg' },
            { property: 'og:url', content: 'https://www.thepixelatedplanet.com/404' },
            { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/404' },
          ]);
    }
}