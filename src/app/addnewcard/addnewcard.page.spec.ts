import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcardPage } from './addnewcard.page';

describe('AddnewcardPage', () => {
  let component: AddnewcardPage;
  let fixture: ComponentFixture<AddnewcardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
