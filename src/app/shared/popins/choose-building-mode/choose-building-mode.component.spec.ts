import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseBuildingModeComponent } from './choose-building-mode.component';

describe('ChooseBuildingModeComponent', () => {
  let component: ChooseBuildingModeComponent;
  let fixture: ComponentFixture<ChooseBuildingModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseBuildingModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseBuildingModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
