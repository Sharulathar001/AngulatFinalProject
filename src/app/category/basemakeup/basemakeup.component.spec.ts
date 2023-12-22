import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemakeupComponent } from './basemakeup.component';

describe('BasemakeupComponent', () => {
  let component: BasemakeupComponent;
  let fixture: ComponentFixture<BasemakeupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasemakeupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasemakeupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
