import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFloorComponent } from './manage-floor.component';

describe('ManageFloorComponent', () => {
  let component: ManageFloorComponent;
  let fixture: ComponentFixture<ManageFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
