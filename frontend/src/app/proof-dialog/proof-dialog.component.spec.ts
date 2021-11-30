import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProofDialogComponent } from './proof-dialog.component';

describe('ProofDialogComponent', () => {
  let component: ProofDialogComponent;
  let fixture: ComponentFixture<ProofDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProofDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProofDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
