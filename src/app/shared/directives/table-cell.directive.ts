import { Directive, TemplateRef } from "@angular/core";

@Directive({
  selector: '[datatableCell]'
})
export class TableCellDirective { 
  constructor(public template: TemplateRef<any>){}
}