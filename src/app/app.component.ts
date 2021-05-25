import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IconService } from './core/services/icon/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor( firestore: AngularFirestore, private iconService: IconService) {}
  title = 'terracotta-fire';

  ngOnInit() {
    this.iconService.registerIcons();
  }
}
