import { Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, SimpleChanges, Type, ViewChild, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TableColumnComponent } from './table-column/table-column.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {
  @Input() columns: string[];
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() dataSource: Observable<MatTableDataSource<T>>

  @Input() pagination: boolean = true;
  @Input() sortable: boolean = true;
  @Input() filterable: boolean = true;

  @Input() defaultSortColumn: string;
  @Input() defaultSortDirection: 'asc' | 'desc' = 'asc';
  @Output() rowSelected: EventEmitter<T> = new EventEmitter();

  /** Column definitions added via the DatatableColumn component */
  @ContentChildren(TableColumnComponent) tableColumns: QueryList<TableColumnComponent<T>>;
  
  /** References to the table and row definitions in this template */
  @ViewChild(MatTable) table: MatTable<T>;
  @ViewChild(MatHeaderRowDef) headerRows: MatHeaderRowDef;
  @ViewChildren(MatRowDef) rows: QueryList<MatRowDef<T>>;

  /** Paginator */
  @ViewChild(MatPaginator) paginator: MatPaginator;
  /** Sorter */
  public sort: MatSort = new MatSort();
  /** The data resultant from the provided dataSource - this is fed directly into the table for display */
  public data: MatTableDataSource<T>;
  /** Whether the data is loading from the source or not */
  public loading: boolean = true;


  constructor() { }

  private unsubscribe$: Subject<void>;


  ngOnInit(): void {
  }

  ngAfterContentInit() {
    // define columns if not already set
    this.columns = this.columns || this.tableColumns.map(column => column.name);

    // set data result and status from source
    this.dataSource.pipe(takeUntil(this.unsubscribe$)).subscribe((data: MatTableDataSource<T>) => {
      // this.loading = data.loading;
      this.data = new MatTableDataSource<T>(data.data);
      this.data.sort = this.sort;
      this.data.paginator = (this.pagination) ? this.paginator : null;

      // if there is sorting, default sort must also be set for table interactions to work
       if (this.sortable) {
        // get a sub-set of columns which are defined as sortable
        const sortableColumns = this.tableColumns
          .filter(column => (column.sortable && this.columns.includes(column.name)))
          .map(column => column.name);

        // only implement sorting if there are sortable columns
        if (sortableColumns.length > 0) {
          this.data.sort = this.sort;
          this.sort.sort(<MatSortable>{
            id: (this.defaultSortColumn && sortableColumns.includes(this.defaultSortColumn)) ? this.defaultSortColumn : sortableColumns[0],
            start: this.defaultSortDirection
          });
        }
      }
    });

    // register datatable-columns to the table
    this.tableColumns.forEach(datatableColumn => {
      this.table.addColumnDef(datatableColumn.columnDef);
      // register sort header for each sortable column
      if (datatableColumn.sortable) {
        this.sort.register(<MatSortable>{
          id: datatableColumn.name,
          start: 'asc'
        });

        datatableColumn.sortUpdate.pipe(takeUntil(this.unsubscribe$)).subscribe((column: string) => {
          this.sort.sort(<MatSortable>{
            id: column,
            start: 'asc'
          });
        });
      }
    });

    // send updated sort direction information back to column for display update when sorting event occurs
    this.sort.sortChange.subscribe(event => {
      // this.tableColumns.find(column => column.name = event.active).sortDirection = event.direction;
    });
  }

  
  /**
   * Apply filter to current data source
   * @param filterValue The value to filter against
   * @return void
   */
   public applyFilter(filterValue: string): void {
    if (this.filterable) {
      this.data.filter = filterValue.trim().toLowerCase();

      if (this.data.paginator) {
        this.data.paginator.firstPage();
      }
    }
  }

}
