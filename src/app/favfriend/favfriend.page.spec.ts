import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavfriendPage } from './favfriend.page';

describe('FavfriendPage', () => {
  let component: FavfriendPage;
  let fixture: ComponentFixture<FavfriendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavfriendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavfriendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
