import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPinsComponent } from './list-pins.component';

describe('ListPinsComponent', () => {
  let component: ListPinsComponent;
  let fixture: ComponentFixture<ListPinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPinsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
