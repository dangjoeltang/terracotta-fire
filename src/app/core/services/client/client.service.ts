import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, forkJoin, from, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, distinct, filter, map, mergeMap, pluck, take, tap } from 'rxjs/operators';
import { Client } from 'src/app/shared/models/client.model';
import { Contact } from 'src/app/shared/models/contact.model';
import { ContactService } from '../contact/contact.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientsCollection: AngularFirestoreCollection = this.afs.collection<Client[]>('clients', ref => ref.limit(25));
  private clientsList = new BehaviorSubject(null);
  private client = new BehaviorSubject(null);
  
  public clientsList$ = this.clientsList.asObservable();
  public client$ = this.client.asObservable();

  constructor(private afs: AngularFirestore, private contactService: ContactService) {
    this.fetchClients();
  }

  // getClients() {
  //   if (this.clientsList.getValue() === null) {
  //     this.fetchClients();
  //   }
  // }

  private fetchClients(): void{
    this.clientsCollection.valueChanges({ idField: 'clientId' }).pipe(take(1)).subscribe((clients: Client[]) => {
      this.clientsList.next(clients);
    })
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

  findClientByAccountNumberOrEmail(querystring: string): Observable<Client> {
    return this.afs.collection<Client>('clients', ref => 
      ref.where('accountNumber', '==', querystring.toUpperCase())
    ).valueChanges().pipe(
      map((clients: Client[]) => clients[0])
    );
  }

  /**
   * 
   * @param email email address of a contact from a client
   * @returns Observable of client that the contact's email is associated with
   */
  getClientOfContact(contact: Contact): Observable<Client> {
    return this.afs.collection<Client>('clients', ref => 
      ref.where('name', '==', contact.client))
      .valueChanges()
      .pipe(
        map((clients: Client[]) => {
          if (clients.length > 0) {
            return clients[0]
          } else {
            throwError(new Error(`This contact does not currently belong a client`));
          }
        }),
        catchError(err =>this.handleError(err))
      )

  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
