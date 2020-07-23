import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuctionModalComponent } from './add-auction-modal.component';

describe('AddAuctionModalComponent', () => {
  let component: AddAuctionModalComponent;
  let fixture: ComponentFixture<AddAuctionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuctionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuctionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
