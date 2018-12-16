import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersionalPerticulardetailComponent } from './persional-perticulardetail.component';

describe('PersionalPerticulardetailComponent', () => {
  let component: PersionalPerticulardetailComponent;
  let fixture: ComponentFixture<PersionalPerticulardetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersionalPerticulardetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersionalPerticulardetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
