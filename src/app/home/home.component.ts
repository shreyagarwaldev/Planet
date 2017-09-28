import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkshopsListComponent } from '../workshops-list/workshops-list.component'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

@ViewChild(WorkshopsListComponent) workshopsListChildComp:WorkshopsListComponent;

  private globalConstants : GlobalConstantsRepository;

  constructor(private globalConstantsRepository:GlobalConstantsRepository) {
    this.globalConstants = globalConstantsRepository;
  }

  ngOnInit() {
		var today = new Date();
		let startDate = `${today.getFullYear().toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;
		let endDate = `${(today.getFullYear()+10).toString()}/${(today.getMonth()+1).toString()}/${today.getDate().toString()}`;
		let query = `${this.globalConstants.getPixelatedPlanetAPIUrl()}/Workshops?startDateFilter=${startDate}&endDateFilter=${endDate}`;
		this.workshopsListChildComp.getWorkshopsData(query, 1, 4);
  }

}
