import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionUsersComponent } from './auction-users.component';

describe('AuctionUsersComponent', () => {
  let component: AuctionUsersComponent;
  let fixture: ComponentFixture<AuctionUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
