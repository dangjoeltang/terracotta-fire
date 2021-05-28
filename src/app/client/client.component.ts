import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientService } from '../core/services/client/client.service';
import { Client } from '../shared/models/client.model';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { ClientFormComponent } from './client-form/client-form.component';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  private unsubscribe$: Subject<void>;
  clients: Client[];
  client: Client;

  constructor(private clientService: ClientService, public dialog: MatDialog) {
    this.unsubscribe$ = new Subject<void>()
  }

  ngOnInit() {
    this.clientService.clientsList$.pipe(takeUntil(this.unsubscribe$)).subscribe((clientList: Client[]) => {
      this.clients = clientList;
    })
    this.clientService.client$.pipe(takeUntil(this.unsubscribe$)).subscribe((client: Client) => {
      this.client = client;
    })
    this.clientService.getClients();
  }

  refresh() { 
    console.log(this.clients)
    this.clientService.getClients();
  }

  clientSelected(client: Client) {
    this.clientService.getClient(client.clientId);
    // this.openClientQuickViewDialog();
  }

  openCreateClientDialog() {
    const config = {
      position: {
        top: '10px',
        right: '10px'
      },
      height: '98%',
      width: '50vw',
      panelClass: 'full-screen-modal',
    }
    // const dialogRef = this.dialog.open(ClientFormComponent, config);
    const dialogRef = this.dialog.open(ClientFormComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openClientQuickViewDialog() {
    const dialogRef = this.dialog.open(ClientDetailsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
    }
  }
}
