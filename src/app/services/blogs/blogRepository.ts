import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { GlobalConstantsRepository } from '../shared/globalConstantsRepository'


export interface IBlogOverview {
    id: number;
    heading: string;
    content: string;
    url: string;
    image: string;
}

export interface IBlogDetail {
    title: string;
    image: string;
}

@Injectable()
export class BlogRepository {

    constructor(public http: Http, public globalConstants: GlobalConstantsRepository) { }

    public getAllBlogs(): Promise<IBlogOverview[]> {
        return this.http.get(this.globalConstants.getBlogsUrl())
        .toPromise()
        .then(response => {
            return response.json();
        });
    }

    public getBlogDetails(id: string): Promise<IBlogDetail> {
        return this.http.get(this.globalConstants.getBlogDetailsUrl(id))
        .toPromise()
        .then(response => {
            return response.json();
        });
    }

}