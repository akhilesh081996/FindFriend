import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtheruserPage } from './otheruser.page';

describe('OtheruserPage', () => {
  let component: OtheruserPage;
  let fixture: ComponentFixture<OtheruserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtheruserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtheruserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
