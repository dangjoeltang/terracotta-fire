import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
    NgbModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    MenuDropdownComponent,
    MenuLinksComponent,
    NgbModule,
    ReactiveFormsModule,
    RouterModule,
    SideMenuComponent
  ]
})
export class SharedModule { }
