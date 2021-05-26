import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseruploadPage } from './userupload.page';

describe('UseruploadPage', () => {
  let component: UseruploadPage;
  let fixture: ComponentFixture<UseruploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseruploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseruploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
