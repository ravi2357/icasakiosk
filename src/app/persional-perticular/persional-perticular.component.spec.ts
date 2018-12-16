import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersionalPerticularComponent } from './persional-perticular.component';

describe('PersionalPerticularComponent', () => {
  let component: PersionalPerticularComponent;
  let fixture: ComponentFixture<PersionalPerticularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersionalPerticularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersionalPerticularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
