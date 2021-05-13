import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ClientRoutingModule } from './client-routing.module';



@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    AngularFirestoreModule
  ],
  exports: [
    ClientComponent
  ]
})
export class ClientModule { }
