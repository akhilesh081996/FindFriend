import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetschedulePage } from './setschedule.page';

describe('SetschedulePage', () => {
  let component: SetschedulePage;
  let fixture: ComponentFixture<SetschedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetschedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
