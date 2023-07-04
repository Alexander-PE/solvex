import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductentryComponent } from './productentry.component';

describe('ProductentryComponent', () => {
  let component: ProductentryComponent;
  let fixture: ComponentFixture<ProductentryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductentryComponent]
    });
    fixture = TestBed.createComponent(ProductentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
