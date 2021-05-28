import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/shared/models/client.model';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() clientList: Client[];
  @Output() clientSelected: EventEmitter<Client> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<Client>
  displayedColumns: string[] = ['name', 'email', 'state'];
  displayedColumnsMobile: string[] = ['name', 'email', 'state'];
  
  private unsubscribe$: Subject<void>;

  constructor(private clientService: ClientService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<Client>(this.clientList);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    
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

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.next();
    }
  }
}