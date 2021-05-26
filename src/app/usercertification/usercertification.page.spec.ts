import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercertificationPage } from './usercertification.page';

describe('UsercertificationPage', () => {
  let component: UsercertificationPage;
  let fixture: ComponentFixture<UsercertificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercertificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercertificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
