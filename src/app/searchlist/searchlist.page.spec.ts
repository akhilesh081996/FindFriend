import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchlistPage } from './searchlist.page';

describe('SearchlistPage', () => {
  let component: SearchlistPage;
  let fixture: ComponentFixture<SearchlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchlistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
