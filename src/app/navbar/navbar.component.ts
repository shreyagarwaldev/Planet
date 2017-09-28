import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'navi-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavComponent {
    hideFilter: boolean;
    hideNavbar: boolean;
    @Output() filtersDropdownToggle = new EventEmitter();
    @Input() showFilters: boolean;
    @Input() showName: boolean;

    constructor() {
        this.hideFilter = true;
        this.hideNavbar = true;
    }
    toggleFilter() {
        this.hideFilter = !this.hideFilter;
        if (!this.hideNavbar) {
            this.hideNavbar = true;
        }
        this.filtersDropdownToggle.emit(this.hideFilter);
    }

    toggleNavbar() {
        this.hideNavbar = !this.hideNavbar;
        if (!this.hideFilter) {
            this.hideFilter = true;
            this.filtersDropdownToggle.emit(this.hideFilter);
        }
    }
}