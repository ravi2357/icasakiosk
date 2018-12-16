import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScancardComponent } from './scancard.component';

describe('ScancardComponent', () => {
  let component: ScancardComponent;
  let fixture: ComponentFixture<ScancardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScancardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScancardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
