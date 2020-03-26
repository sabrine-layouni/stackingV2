import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellModeComponent } from './cell-mode.component';

describe('CellModeComponent', () => {
  let component: CellModeComponent;
  let fixture: ComponentFixture<CellModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
