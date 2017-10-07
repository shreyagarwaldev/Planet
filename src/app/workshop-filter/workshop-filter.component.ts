import { Component, OnInit, Renderer, Output, EventEmitter, ViewChild } from '@angular/core';
import { WorkshopRepository, ILocation, IPhotographer } from '../services/workshops/workshopRepository'
import { GlobalConstantsRepository } from '../services/shared/globalConstantsRepository'
import { AutocompleteComponent } from '../autocomplete/autocomplete.component'
import { DatePickerComponent } from '../date-picker/date-picker.component'
import { DropdownComponent } from '../dropdown-menu/dropdown-menu.component'

@Component({
    selector: 'workshop-filter',
    templateUrl: './workshop-filter.component.html',
    styleUrls: ['./workshop-filter.component.scss']
})

export class WorkshopFilterComponent {

    @Output() dateRangeChanged = new EventEmitter();
    @Output() locationFilterChanged = new EventEmitter();
    @Output() categoryFilterChanged = new EventEmitter();
    @Output() minPriceFilterChanged = new EventEmitter();
    @Output() maxPriceFilterChanged = new EventEmitter();
    @Output() applyFilters = new EventEmitter();

    public categories: any[];

    // price values
    minPriceValue: number;
    maxPriceValue: number;

    /** date filters */
    public dateRange: Array<Date>;

    private globalConstants: GlobalConstantsRepository;
    private workshopRepo: WorkshopRepository;

    public showFilter: boolean;

    @ViewChild(AutocompleteComponent) autocompleteChildComp: AutocompleteComponent;
    @ViewChild(DatePickerComponent) datePickerChildComp: DatePickerComponent;
    @ViewChild(DropdownComponent) dropdownChildComp: DropdownComponent;

    constructor(private workshopRepository: WorkshopRepository,

        private globalConstantsRepository: GlobalConstantsRepository) {
        this.globalConstants = globalConstantsRepository;
        this.workshopRepo = workshopRepository;

        this.updateCategories();
        this.showFilter = true;
    }

    setValuesFromParameters(minPrice: number, maxPrice: number, categories: string, locationId: number, startDate: string, endDate: string) {
        this.minPriceValue = minPrice || null;
        this.maxPriceValue = maxPrice || null;

        if (endDate && startDate) {
            this.datePickerChildComp.setDate(Date.parse(startDate), Date.parse(endDate));
        }
        else {
            this.datePickerChildComp.setDate(null, null);
        }

        if (locationId || Number.isNaN(locationId)) {
            this.autocompleteChildComp.select({ id: locationId });
        }

        this.dropdownChildComp.selectValue(!categories || categories == "" ? "Category" : categories);
    }

    updateCategories() {
        this.categories = [];
        this.workshopRepo.getWorkshopTypes().then(wTypes => {
            wTypes.forEach(workshopType => {
                this.categories.push({ label: workshopType, value: workshopType });
            });
        });
    }

    getDate(value: Array<Date>) {
        this.dateRange = value;
        this.dateRangeChanged.emit(this.dateRange);
    }

    toggleFilter() {
        this.applyFilters.emit(true);
    }

    updateMinPrice(value: number) {
        this.minPriceFilterChanged.emit(value);
    }


    updateMaxPrice(value: number) {
        this.maxPriceFilterChanged.emit(value);
    }

    updateLocation(value: any) {
        if (value && value.id) {
            this.locationFilterChanged.emit(value.id);
        }
        else {
            this.locationFilterChanged.emit(null);
        }
    }

    updateCategoryList(value: string) {
        this.categoryFilterChanged.emit(value);
    }
}