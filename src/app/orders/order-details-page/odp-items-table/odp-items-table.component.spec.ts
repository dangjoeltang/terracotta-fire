import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdpItemsTableComponent } from './odp-items-table.component';

describe('OdpItemsTableComponent', () => {
  let component: OdpItemsTableComponent;
  let fixture: ComponentFixture<OdpItemsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdpItemsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdpItemsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
