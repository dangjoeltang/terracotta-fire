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
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideMenuComponent,
    MenuLinksComponent,
    MenuDropdownComponent
  ],
  imports: [
    CdkStepperModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CdkStepperModule,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MenuDropdownComponent,
    MenuLinksComponent,
    ReactiveFormsModule,
    RouterModule,
    SideMenuComponent
  ]
})
export class SharedModule { }
