import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
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

  private clientsList = new BehaviorSubject(null);
  public clientsList$ = this.clientsList.asObservable();

  private client = new BehaviorSubject(null);
  public client$ = this.client.asObservable();

  constructor(private afs: AngularFirestore) { }

  getClients() {
    this.clientsCollection.valueChanges({ idField: 'clientId' }).subscribe(
      (data) => this.clientsList.next(data)
    )
  }

  getClient(clientId: string) {
    const clientDoc: AngularFirestoreDocument<Client> = this.afs.doc<Client>(`clients/${clientId}`);
    // this.client.next(clientDoc.valueChanges());
    clientDoc.valueChanges().subscribe(
      data => this.client.next(data)
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
