import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageParkingsComponent } from './manage-parkings.component';

describe('ManageParkingsComponent', () => {
  let component: ManageParkingsComponent;
  let fixture: ComponentFixture<ManageParkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageParkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
