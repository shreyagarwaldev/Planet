import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';


export interface IBlogOverview {
    id: number;
    heading: string;
    content: string;
    url: string;
    image: string;
}

@Injectable()
export class BlogRepository {

    constructor(public http: Http) { }

    public getAllBlogs(): IBlogOverview[] {
        return [{
            "id": 1,
            "heading": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "content": `Sed ut perspiciatis unde omnis iste natus error 
            sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore verit
            atis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
             enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi n
              esciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
              ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima Sed ut perspiciatis unde omnis iste natus error 
            sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore verit
            atis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
             enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui`,
            "url": "https://www.thepixelatedplanet.com",
            "image": "./assets/img/header.jpg"
        },
        {
            "id": 2,
            "heading": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "content": `Sed ut perspiciatis unde omnis iste natus error 
            sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore verit
            atis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
             enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi n
              esciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
              ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima`,
            "url": "https://www.thepixelatedplanet.com",
            "image": "./assets/img/header.jpg"
        },
        {
            "id": 3,
            "heading": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "content": `Sed ut perspiciatis unde omnis iste natus error 
            sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore verit
            atis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
             enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi n
              esciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
              ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima.`,
            "url": "https://www.thepixelatedplanet.com",
            "image": "./assets/img/header.jpg"
        },
        {
            "id": 4,
            "heading": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
            "content": `Sed ut perspiciatis unde omnis iste natus error 
            sit voluptatem accusantium doloremque laudantium, 
            totam rem aperiam, eaque ipsa quae ab illo inventore verit
            atis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
             enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores eos qui ratione voluptatem sequi n
              esciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, 
              consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt 
              ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima`,
            "url": "https://www.thepixelatedplanet.com",
            "image": "./assets/img/header.jpg"
        }];
    }

}