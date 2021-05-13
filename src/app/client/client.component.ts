import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private itemDoc: AngularFirestoreDocument;
  item: Observable<any>;
  data: any;

  constructor(afs: AngularFirestore) {
    this.itemDoc = afs.doc('clients/klfU8VpAvW25IJD0vUng');
    this.item = this.itemDoc.valueChanges()
  }

  ngOnInit(): void {
    this.item.subscribe(res => {
      console.log(res)
      this.data = res;
    })
  }

}
