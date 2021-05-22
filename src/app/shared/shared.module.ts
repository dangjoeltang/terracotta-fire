import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuLinksComponent } from './components/side-menu/menu-links/menu-links.component';
import { MenuDropdownComponent } from './components/side-menu/menu-dropdown/menu-dropdown.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideMenuComponent,
    MenuLinksComponent,
    MenuDropdownComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MatIconModule,
    MatListModule,
    MenuDropdownComponent,
    MenuLinksComponent,
    ReactiveFormsModule,
    RouterModule,
    SideMenuComponent
  ]
})
export class SharedModule { }
