import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenTimingComponent } from './open-timing.component';

describe('OpenTimingComponent', () => {
  let component: OpenTimingComponent;
  let fixture: ComponentFixture<OpenTimingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTimingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
