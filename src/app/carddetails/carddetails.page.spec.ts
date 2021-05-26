import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarddetailsPage } from './carddetails.page';

describe('CarddetailsPage', () => {
  let component: CarddetailsPage;
  let fixture: ComponentFixture<CarddetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarddetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarddetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
