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
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableComponent } from './components/table/table.component';
import { TableColumnComponent } from './components/table/table-column/table-column.component';
import { StateNamePipe } from './pipes/state-name.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SideMenuComponent,
    MenuLinksComponent,
    MenuDropdownComponent,
    StateNamePipe,
    TableComponent,
    TableColumnComponent,
    AddressFormComponent,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  imports: [
    CdkStepperModule,
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CdkStepperModule,
    FlexLayoutModule,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatStepperModule,
    MatTableModule,
    MenuDropdownComponent,
    MenuLinksComponent,
    ReactiveFormsModule,
    RouterModule,
    SideMenuComponent,
    StateNamePipe,
    TableComponent,
    TableColumnComponent
  ]
})
export class SharedModule { }
