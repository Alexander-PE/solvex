import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherproductComponent } from './anotherproduct.component';

describe('AnotherproductComponent', () => {
  let component: AnotherproductComponent;
  let fixture: ComponentFixture<AnotherproductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnotherproductComponent]
    });
    fixture = TestBed.createComponent(AnotherproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
