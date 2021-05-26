import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditkycPage } from './editkyc.page';

describe('EditkycPage', () => {
  let component: EditkycPage;
  let fixture: ComponentFixture<EditkycPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditkycPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditkycPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
