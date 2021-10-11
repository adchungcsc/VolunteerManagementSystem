import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAnEventComponent } from './find-an-event.component';

describe('FindAnEventComponent', () => {
  let component: FindAnEventComponent;
  let fixture: ComponentFixture<FindAnEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindAnEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAnEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
