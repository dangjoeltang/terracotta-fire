import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { ClientComponent } from './client.component';
import { ClientRoutingModule } from './client-routing.module';
import { ClientTableComponent } from './client-table/client-table.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ClientComponent,
    ClientTableComponent,
    ClientFormComponent,
    ClientDetailsComponent
  ],
  imports: [
    AngularFirestoreModule,
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ],
  exports: [
    ClientComponent
  ],
  providers: []
})
export class ClientModule { }
