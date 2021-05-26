import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosehomePage } from './chosehome.page';

describe('ChosehomePage', () => {
  let component: ChosehomePage;
  let fixture: ComponentFixture<ChosehomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosehomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosehomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
