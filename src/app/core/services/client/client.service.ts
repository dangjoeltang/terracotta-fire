import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientsCollection: AngularFirestoreCollection = this.afs.collection<Client[]>('clients');
  private clientsList = new BehaviorSubject(null);
  private client = new BehaviorSubject(null);
 
  public clientsList$ = this.clientsList.asObservable();
  public client$ = this.client.asObservable();

  constructor(private afs: AngularFirestore) { }

  getClients() {
    this.clientsCollection.valueChanges({ idField: 'clientId' }).pipe(take(1)).subscribe(
      (clients: Client[]) => {
        this.clientsList.next(clients);
      }
    )
  }

  getClient(clientId: string) {
    const clientDoc: AngularFirestoreDocument<Client> = this.afs.doc<Client>(`clients/${clientId}`);
    clientDoc.valueChanges().pipe(take(1)).subscribe(
      data => {
        this.client.next(data);
      }
    )
  }

  createClient(clientData: Client) {
    clientData.createDate = new Date();
    this.clientsCollection.add(clientData)
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  findClientByAccountNumberOrEmail(querystring: string): Observable<Client[]> {
    return this.afs.collection<Client>('clients', ref => 
      ref.where('accountNumber', '==', querystring.toUpperCase())
    ).valueChanges();
  }
}
