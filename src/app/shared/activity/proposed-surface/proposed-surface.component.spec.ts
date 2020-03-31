import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposedSurfaceComponent } from './proposed-surface.component';

describe('ProposedSurfaceComponent', () => {
  let component: ProposedSurfaceComponent;
  let fixture: ComponentFixture<ProposedSurfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposedSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposedSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
