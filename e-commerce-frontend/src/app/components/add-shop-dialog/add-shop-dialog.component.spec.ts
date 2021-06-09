import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopDialogComponent } from './add-shop-dialog.component';

describe('AddShopDialogComponent', () => {
  let component: AddShopDialogComponent;
  let fixture: ComponentFixture<AddShopDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShopDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
