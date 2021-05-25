import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/shared/models/client.model';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit {
  @Output() clientSelected: EventEmitter<Client> = new EventEmitter();
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'email', 'state'];
  displayedColumnsMobile: string[] = ['name', 'email', 'state'];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.clientsList$.subscribe((clientList: Client[]) => {
      this.dataSource = new MatTableDataSource(clientList);
      this.dataSource.paginator = this.paginator;
    })
    // this.clientService.client$.subscribe((res) => {
    //   console.log(res);
    // })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectClient(client: Client): void {
    this.clientSelected.emit(client)
  }
}
