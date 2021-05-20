import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client.model';
import mockData from 'src/assets/mock-clients.json';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientMock: any[] = mockData;

  private clientsCollection: AngularFirestoreCollection = this.afs.collection<Client[]>('clients');

  private clients = new BehaviorSubject(null);
  public clients$ = this.clients.asObservable();

  constructor(private afs: AngularFirestore) { }

  getClients() {
    this.clientsCollection.valueChanges().subscribe(
      (data: Client[]) => this.clients.next(data)
    )
  }

  pushMockData() {
    // console.log(this.clientMock)
    // for (let client of this.clientMock) {
    //   // this.clientsCollection.add(client);
    //   // console.log(client);
    // }
  }
}
