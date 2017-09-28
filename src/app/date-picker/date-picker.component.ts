import { Component, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { MyDatePicker } from 'mydatepicker'

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})

export class DatePickerComponent {
    fromDatePickerOptions;
    toDatePickerOptions;
    fromDateLabel: string = "From date";
    toDateLabel: string = "To date";
    previousDate;
    selFromDate: string;
    selToDate: string;

  @Output() selectedFromChanged = new EventEmitter();
  @Output() selectedToChanged = new EventEmitter();

  constructor(private element: ElementRef) {
    let currentDate = new Date();
    let previous = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate() - 1);
    this.previousDate = { year: previous.getFullYear(), month: previous.getMonth(), day: previous.getDate() };
  }

  public setToDate(miliseconds: number) {
    let date = new Date(miliseconds);
    this.selToDate = date.toISOString().slice(0,10);
  }

  public setFromDate(miliseconds: number) {
    let date = new Date(miliseconds);
    this.selFromDate = date.toISOString().slice(0,10);
  }

  ngOnInit() {
    this.fromDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      markCurrentDay: true,
      yearSelector: true,
      monthSelector: true,
      disableUntil: this.previousDate
    };

    this.toDatePickerOptions = {
        dateFormat: 'yyyy-mm-dd',
        markCurrentDay: true,
        yearSelector: true,
        monthSelector: true,
        disableUntil: this.previousDate
      };
  }

  onFromDateChanged(event: any) {
    var selectedDate = event.date;
    this.toDatePickerOptions = {
      dateFormat: 'yyyy-mm-dd',
      markCurrentDay: true,
      yearSelector: true,
      monthSelector: true,
      disableUntil: {
        year: selectedDate.year,
        month: selectedDate.month,
        day: selectedDate.day
      }
    };

    this.selectedFromChanged.emit(selectedDate);
  }

  onToDateChanged(event: any) {
    var selectedDate = event.date;
    this.fromDatePickerOptions = {
      disableUntil: this.previousDate,
      disableSince: {
        year: selectedDate.year,
        month: selectedDate.month,
        day: selectedDate.day
      }
    };
    this.selectedToChanged.emit(selectedDate);
  }
}