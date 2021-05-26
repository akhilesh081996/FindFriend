import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateexperiencePage } from './rateexperience.page';

describe('RateexperiencePage', () => {
  let component: RateexperiencePage;
  let fixture: ComponentFixture<RateexperiencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateexperiencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateexperiencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
