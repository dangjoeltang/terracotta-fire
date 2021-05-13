import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from 'src/app/shared/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = afs.collection<Client>('clients');

    this.clients = this.clientsCollection.valueChanges();
  }
}
