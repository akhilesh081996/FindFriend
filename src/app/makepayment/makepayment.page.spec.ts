import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakepaymentPage } from './makepayment.page';

describe('MakepaymentPage', () => {
  let component: MakepaymentPage;
  let fixture: ComponentFixture<MakepaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakepaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakepaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
