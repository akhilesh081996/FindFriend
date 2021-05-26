import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPage } from './trainer.page';

describe('TrainerPage', () => {
  let component: TrainerPage;
  let fixture: ComponentFixture<TrainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
