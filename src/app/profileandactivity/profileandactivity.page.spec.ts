import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileandactivityPage } from './profileandactivity.page';

describe('ProfileandactivityPage', () => {
  let component: ProfileandactivityPage;
  let fixture: ComponentFixture<ProfileandactivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileandactivityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileandactivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
