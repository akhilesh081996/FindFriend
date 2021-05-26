import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewratingPage } from './reviewrating.page';

describe('ReviewratingPage', () => {
  let component: ReviewratingPage;
  let fixture: ComponentFixture<ReviewratingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewratingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewratingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
