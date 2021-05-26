import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateuserPage } from './updateuser.page';

describe('UpdateuserPage', () => {
  let component: UpdateuserPage;
  let fixture: ComponentFixture<UpdateuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
