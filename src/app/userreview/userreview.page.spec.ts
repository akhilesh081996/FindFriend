import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreviewPage } from './userreview.page';

describe('UserreviewPage', () => {
  let component: UserreviewPage;
  let fixture: ComponentFixture<UserreviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserreviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
