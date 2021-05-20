import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MenuLinksComponent } from './components/side-menu/menu-links/menu-links.component';
import { MenuDropdownComponent } from './components/side-menu/menu-dropdown/menu-dropdown.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


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
    FlexLayoutModule,
    MatIconModule,
    MatListModule,
    NgbModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FlexLayoutModule,
    FooterComponent,
    HeaderComponent,
    MatIconModule,
    MatListModule,
    MenuDropdownComponent,
    MenuLinksComponent,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    SideMenuComponent
  ]
})
export class SharedModule { }
