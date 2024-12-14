import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPinModalComponent } from './add-pin-modal.component';

describe('AddPinModalComponent', () => {
  let component: AddPinModalComponent;
  let fixture: ComponentFixture<AddPinModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPinModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPinModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
