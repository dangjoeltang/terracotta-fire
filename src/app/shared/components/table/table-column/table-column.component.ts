import { Component, ContentChild, EventEmitter, Input, OnInit, Optional, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatSortHeader, SortDirection } from '@angular/material/sort';
import { MatColumnDef, MatTable } from '@angular/material/table';
import { TableCellDirective } from 'src/app/shared/directives/table-cell.directive';

@Component({
  selector: 'app-table-column',
  templateUrl: './table-column.component.html',
  styleUrls: ['./table-column.component.scss']
})
export class TableColumnComponent<T> implements OnInit {
  /** The current direction of the sorting of the column */
  public sortDirection: SortDirection = '';

  /** Column name that should be used to reference this column. */
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = name;
    this.columnDef.name = name;
  }
  _name: string;

  /**
   * Text label that should be used for the column header. If this property is not
   * set, the header text will default to the column name.
   */
  @Input() label: string;

  /**
   * Accessor function to retrieve the data should be provided to the cell. If this
   * property is not set, the data cells will assume that the column name is the same
   * as the data property the cells should display.
   */
  @Input() dataAccessor: ((data: T, name: string) => string);

  /** Alignment of the cell values. */
  @Input() align: 'before' | 'after' = 'before';

  /** Whether the column is sortable */
  @Input() sortable: boolean = true;

  /** Event to emit when sorting is updated */
  @Output() sortUpdate = new EventEmitter<string>();

  /** Reference to column definitions and sort headers */
  @ViewChild(MatColumnDef) columnDef: MatColumnDef;
  @ViewChild(MatSortHeader) sortHeader: MatSortHeader;

  @ContentChild(TableCellDirective, {read: TemplateRef}) template;

  constructor(@Optional() public table: MatTable<any>) { }

  /**
   * Gives a formatted version of the name if label is not present
   * @return The formatted label
   */
  public getTitle(): string {
    return this.label;
    // return this.label || startCase(this.name);
  }

  public getData(data: T): any {
    return this.dataAccessor ? this.dataAccessor(data, this.name) : (data as any)[this.name];
  }

  /**
   * Triggers a sort action on this column by emitting a sort update action to the parent datatable
   */
  public sort(): void {
    this.sortUpdate.emit(this.name);
  }

  ngOnInit() {
    if (this.table) {
      this.table.addColumnDef(this.columnDef);
    }
  }

  ngOnDestroy() {
    if (this.table) {
      this.table.removeColumnDef(this.columnDef);
    }
  }
}
