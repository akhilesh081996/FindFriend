import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeheduletimePage } from './seheduletime.page';

describe('SeheduletimePage', () => {
  let component: SeheduletimePage;
  let fixture: ComponentFixture<SeheduletimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeheduletimePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeheduletimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
