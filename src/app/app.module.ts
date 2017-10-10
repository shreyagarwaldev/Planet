import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './navbar/navbar.component'
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { DatePickerComponent } from './date-picker/date-picker.component'
import { DropdownComponent } from './dropdown-menu/dropdown-menu.component'
import { WorkshopFilterComponent } from './workshop-filter/workshop-filter.component'
import { WorkshopsListComponent } from './workshops-list/workshops-list.component'
import { WorkshopsComponent } from './workshops/workshops.component'
import { AboutComponent } from './about/about.component'
import { FeedbackComponent } from './feedback/feedback.component'
import { FooterComponent } from './footer/footer.component'
import { ErrorComponent } from './error/error.component'
import { ContactUsComponent } from './contact-us/contact-us.component'
import { PrivacyComponent } from './privacy-policy/privacy-policy.component'
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component'
import { PageRedirectComponent } from './page-redirect/page-redirect.component'
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component'
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


import { GlobalConstantsRepository } from './services/shared/globalConstantsRepository'
import { WorkshopRepository } from './services/workshops/workshopRepository'
import { GoogleAnalyticsService } from './services/analytics/googleAnalyticsService'
import { GlobalErrorHandler } from './services/shared/globalErrorHandler'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    ErrorComponent,
    ContactUsComponent,
    AutocompleteComponent,
    DatePickerComponent,
    DropdownComponent,
    WorkshopFilterComponent,
    WorkshopsListComponent,
    WorkshopsComponent,
    WorkshopDetailsComponent,
    FooterComponent,
    PrivacyComponent,
    TermsAndConditionsComponent,
    PageRedirectComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
        { path: 'home', component: HomeComponent, pathMatch: 'full' },
        { path: 'about', component: AboutComponent, pathMatch: 'full' },
        { path: 'photography-workshops/:pageNumber', component: WorkshopsComponent },
        { path: 'photography-workshop-details/:title/:id', component: WorkshopDetailsComponent },
        { path: 'contact', component: ContactUsComponent },
        { path: 'page-redirect/:externalUrl', component: PageRedirectComponent, pathMatch: 'full' },
        { path: '404', component: ErrorComponent, pathMatch:'full'},
        { path: 'termsandconditions', component: TermsAndConditionsComponent, pathMatch: 'full'},
        { path: 'privacypolicy', component: PrivacyComponent, pathMatch: 'full'},
        { path: 'feedback', component: FeedbackComponent, pathMatch: 'full'},
        { path: 'photography-workshops', redirectTo: '/photography-workshops/1' },
        { path: '**', redirectTo: '/404' }
      ]),
    HttpModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  providers: [
      WorkshopRepository,
      GlobalConstantsRepository,
      GoogleAnalyticsService,
      {
        provide: ErrorHandler, 
        useClass: GlobalErrorHandler
      }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
