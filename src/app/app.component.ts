import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { Meta, Title } from '@angular/platform-browser';

declare var gtag : any;

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent {
    constructor(public router : Router) {
        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                gtag('config', 'UA-103414645-1', {
                    'page_title': event.urlAfterRedirects,
                    'page_location': event.url,
                    'page_path': event.url
                  });
            }
        });
    }
}
