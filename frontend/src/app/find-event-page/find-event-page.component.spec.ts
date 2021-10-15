import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEventPageComponent } from './find-event-page.component';

describe('FindEventPageComponent', () => {
  let component: FindEventPageComponent;
  let fixture: ComponentFixture<FindEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindEventPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
