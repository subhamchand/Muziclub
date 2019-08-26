import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTimeComponent } from './practice-time.component';

describe('PracticeTimeComponent', () => {
  let component: PracticeTimeComponent;
  let fixture: ComponentFixture<PracticeTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
