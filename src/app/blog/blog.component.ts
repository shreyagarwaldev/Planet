import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService';
import { BlogRepository, IBlogDetail } from '../services/blogs/blogRepository';
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'
import { WorkshopsListComponent } from '../workshops-list/workshops-list.component';

@Component({
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.scss']
})

export class BlogComponent {

    blogId: string;
    blog: IBlogDetail;

    constructor(private blogRepository: BlogRepository,
        private globalConstantsRepository: GlobalConstantsRepository,
        private route: ActivatedRoute,
        private gaService: GoogleAnalyticsService,
        private title: Title,
        private meta: Meta) {
    }

    ngOnInit() {
        this.blogId = this.route.snapshot.params['id'];
        this.blog = this.blogRepository.getBlogDetails(this.blogId);
        this.gaService.trackPageView('blog');
        this.title.setTitle(this.blog.title + ' - Pixelated Planet')
        this.meta.addTags([
            { name: 'twitter:title', content: this.blog.title + ' - Pixelated Planet' },
            { property: 'og:title', content: this.blog.title + ' - Pixelated Planet' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'The Pixelated Planet' },
            { property: 'fb:app_id', content: '132676104124561' },
            { name: 'description', content: 'Find out more about photography.' },
            { property: 'og:description', content: 'Find out more about photography.' },
            { name: 'twitter:description', content: 'Find out more about photography.' },
            { property: 'og:url', content: 'https://www.thepixelatedplanet.com/blog/' + this.blog.title + '/' + this.blogId },
            { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/blog/' + this.blog.title + '/' + this.blogId },
        ]);
    }
}