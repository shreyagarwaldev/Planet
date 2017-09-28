import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './navbar/navbar.component'
import { MyDatePickerModule } from 'mydatepicker';
import { AutocompleteComponent } from './autocomplete/autocomplete.component'
import { DatePickerComponent } from './date-picker/date-picker.component'
import { DropdownComponent } from './dropdown-menu/dropdown-menu.component'
import { WorkshopFilterComponent } from './workshop-filter/workshop-filter.component'
import { WorkshopsListComponent } from './workshops-list/workshops-list.component'
import { WorkshopsComponent } from './workshops/workshops.component'

import { GlobalConstantsRepository } from './services/shared/globalConstantsRepository'
import { WorkshopRepository } from './services/workshops/workshopRepository'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AutocompleteComponent,
    DatePickerComponent,
    DropdownComponent,
    WorkshopFilterComponent,
    WorkshopsListComponent,
    WorkshopsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'workshops/:pageNumber', component: WorkshopsComponent },
      { path: 'workshops', redirectTo: '/workshops/1' },      
    ]),
    HttpModule,
    MyDatePickerModule
  ],
  providers: [WorkshopRepository, GlobalConstantsRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }
