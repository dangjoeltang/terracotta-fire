import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-dropdown',
  templateUrl: './menu-dropdown.component.html',
  styleUrls: ['./menu-dropdown.component.scss']
})
export class MenuDropdownComponent implements OnInit {
  @Input() title = "Dropdown Title";
  @Input() icon;

  constructor() { }

  ngOnInit(): void {
  }

}
