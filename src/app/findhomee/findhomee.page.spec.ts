import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindhomeePage } from './findhomee.page';

describe('FindhomeePage', () => {
  let component: FindhomeePage;
  let fixture: ComponentFixture<FindhomeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindhomeePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindhomeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
