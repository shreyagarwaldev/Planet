import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})

export class DatePickerComponent {

  @Output() selectedDateChanged = new EventEmitter();
  bsRangeValue: Array<Date>;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor() {
  }

  public setDate(startMiliseconds: number, endMiliseconds: number) {
    if (startMiliseconds && endMiliseconds) {
      let startDate = new Date(startMiliseconds);
      let endDate = new Date(endMiliseconds);
      this.bsRangeValue = [startDate, endDate];
    }
  }

  ngOnInit() {
        this.bsConfig = Object.assign({}, {containerClass: 'date-picker-theme'}, {showWeekNumbers: false});
  }

  onDateChanged(event: Array<Date>) {
    if (event && event !== this.bsRangeValue) {
      var selectedDate = event;
      this.selectedDateChanged.emit(selectedDate);
    }
  }
}