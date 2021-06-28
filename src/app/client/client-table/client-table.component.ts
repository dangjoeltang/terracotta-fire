import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from 'src/app/core/services/client/client.service';
import { Client } from 'src/app/shared/models/client.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.scss']
})
export class ClientTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() clientList: Client[];
  @Output() clientSelected: EventEmitter<Client> = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  private unsubscribe$: Subject<void>;
  
  clientDataSource: MatTableDataSource<Client>;
  displayedColumns: string[] = ['name', 'email', 'state'];
  
  constructor(private clientService: ClientService) {
    this.unsubscribe$ = new Subject<void>();
  }

  ngOnChanges() {
    this.clientDataSource = new MatTableDataSource<Client>(this.clientList);
    this.clientDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {

  }
  
  ngAfterViewInit(): void {
    this.clientDataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientDataSource.filter = filterValue.trim().toLowerCase();

    if (this.clientDataSource.paginator) {
      this.clientDataSource.paginator.firstPage();
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