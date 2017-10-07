import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { WorkshopRepository, ILocation } from '../services/workshops/workshopRepository'

@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

    public query = "";
    private previousValue = "";
    public countries: ILocation[];
    private workshopRepository: WorkshopRepository;

    @Output() selectionChanged = new EventEmitter();

    constructor(private workshopRepo: WorkshopRepository) {
        this.workshopRepository = workshopRepo;
    }

    ngOnInit() {
        this.countries = [];
        this.workshopRepository.getLocations().then((loc: ILocation[]) => {
            this.countries = loc;
        });
    }

    public select(value: any) {
        if (value) {
            let locationId = value.id;
            if (Number.isNaN(locationId)) {
                this.query = "";
            }
            else if (locationId) {
                this.workshopRepository.getLocations().then((locations: ILocation[]) => {
                    locations.forEach((loc: ILocation) => {
                        if (locationId === loc.id) {
                            this.query = loc.name;
                            this.previousValue = this.query;
                        }
                    })
                });
            }
        }

        if (value && value.item) {
            this.query = value.item.name;
            this.previousValue = this.query;
            this.selectionChanged.emit(value.item);
        }
    }

    public onBlur(value: string) {
        if (value === "" && this.previousValue !== value) {
            this.selectionChanged.emit(value);
        }
    }
}