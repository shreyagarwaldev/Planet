import { Component, OnInit, ViewChild } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '../services/analytics/googleAnalyticsService';
import { BlogRepository, IBlogOverview } from '../services/blogs/blogRepository';
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'
import { WorkshopsListComponent } from '../workshops-list/workshops-list.component';

@Component({
    templateUrl: './blogs-overview.component.html',
    styleUrls: ['./blogs-overview.component.scss']
})

export class BlogsOverviewComponent {

    @ViewChild(WorkshopsListComponent) workshopsListChildComp:WorkshopsListComponent;

    allBlogs: IBlogOverview[];
    public readonly numberOfWorkshopsToShow: number = 4;

    constructor(private blogRepository: BlogRepository,
    private globalConstantsRepository:GlobalConstantsRepository,
        gaService: GoogleAnalyticsService,
        title: Title,
        meta: Meta) {
        gaService.trackPageView('blog-overview');
        title.setTitle('Blog - Pixelated Planet')
        meta.addTags([
            { name: 'twitter:title', content: 'Blog - Pixelated Planet' },
            { property: 'og:title', content: 'Blog - Pixelated Planet' },
            { property: 'og:type', content: 'website' },
            { property: 'og:site_name', content: 'The Pixelated Planet' },
            { property: 'fb:app_id', content: '132676104124561' },
            { name: 'description', content: 'Find out more about photography.' },
            { property: 'og:description', content: 'Find out more about photography.' },
            { name: 'twitter:description', content: 'Find out more about photography.' },
            { property: 'og:url', content: 'https://www.thepixelatedplanet.com/blog/' },
            { name: 'twitter:site', content: 'https://www.thepixelatedplanet.com/blog/' },
        ]);

        this.allBlogs = [];
    }

    ngOnInit() {
        this.blogRepository.getAllBlogs().then( blogs =>
            {
                this.allBlogs = blogs;
                this.allBlogs.forEach(blog => {
                    blog.url = `blog/${blog.heading}/${blog.id}`;
                    blog.image = this.getBlogImageCDNLink(blog.id);
                });
            });
        var today = new Date();
        let startDate = `${today.getFullYear().toString()}/${(today.getMonth() + 1).toString()}/${today.getDate().toString()}`;
        let endDate = `${(today.getFullYear() + 10).toString()}/${(today.getMonth() + 1).toString()}/${today.getDate().toString()}`;
        let query = `${this.globalConstantsRepository.getPixelatedPlanetAPIUrl()}/Workshops?startDateFilter=${startDate}&endDateFilter=${endDate}`;
        this.workshopsListChildComp.getWorkshopsData(query, 1, this.numberOfWorkshopsToShow);
    }

    getBlogImageCDNLink(blogId: number) {
        return this.blogRepository.globalConstants.resolveImageUrl(`/img/Blogs/Tile_${blogId}.jpg`);
    }
}