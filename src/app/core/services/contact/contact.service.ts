import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { Contact } from 'src/app/shared/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsCollection: AngularFirestoreCollection = this.afs.collection('contacts');

  constructor(private afs: AngularFirestore) { }

  getContactsByClient(clientName: string) {
    return this.afs.collection('contacts', ref =>
      ref.where('client', '==', clientName)
    ).valueChanges();
  }

  /**
   * 
   * @param email email address to lookup contact by
   * @returns Observable of array of matching contacts
   */
  getContactsByEmail(email: string): Observable<Contact[]> {
    return this.afs.collection<Contact>('contacts', ref => 
      ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map((contacts: Contact[]) => {
          if (contacts.length > 0) {
            return contacts
          } else {
            throwError(new Error(`No contacts found for email: ${email}`));
          }
        }),
        catchError(err => this.handleError(err))
      );
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
