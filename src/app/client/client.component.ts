import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../core/services/client/client.service';
import { Client } from '../shared/models/client.model';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients: Client[];
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.clientService.clients$.subscribe((clientList: Client[]) => {
      this.clients = clientList;
    })
    this.retrieveClients();
  }

  retrieveClients() {
    this.clientService.getClients();
  }

  createNewClient() {
    console.log('create client triggered!');
    this.router.navigate(['clients/new']);
  }
}
