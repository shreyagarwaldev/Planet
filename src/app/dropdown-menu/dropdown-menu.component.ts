import { Component, OnInit, Input, ElementRef, Renderer, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})

/* tslint:disable */
export class DropdownComponent {
  @Input() dataModel: any[];
  @Output() selectionChanged = new EventEmitter();

  isCollapsed: boolean;
  buttonLabel: string;
  private panelOverlay: boolean;
  private selfClick: boolean;

  constructor(private renderer: Renderer, private element: ElementRef) {
    this.isCollapsed = true;
    this.panelOverlay = false;
  }

  ngOnInit() {
    this.buttonLabel = "Category";
    var that = this;
    this.selfClick = false;
    this.renderer.listenGlobal('document', 'click', (event: any) => {
      if (!that.isCollapsed && this.panelOverlay) {
        that.isCollapsed = true;
        this.selectionChanged.emit(this.buttonLabel);
      }
      if (!that.selfClick) {
        that.isCollapsed = true;
      }

      this.selfClick = false;
      this.panelOverlay = false;
    });
  }

  public selectValue(value: string) {
    this.buttonLabel = value;
  }

  toggleDropdown() {
    if (!this.panelOverlay) {
      this.isCollapsed = !this.isCollapsed;
    }
    this.selfClick = true;
  }

  overlay() {
    this.panelOverlay = true;
  }
}
