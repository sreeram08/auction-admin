import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionTabsComponent } from './auction-tabs.component';

describe('AuctionTabsComponent', () => {
  let component: AuctionTabsComponent;
  let fixture: ComponentFixture<AuctionTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
