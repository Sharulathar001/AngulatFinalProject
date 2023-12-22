import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreamsComponent } from './creams.component';

describe('CreamsComponent', () => {
  let component: CreamsComponent;
  let fixture: ComponentFixture<CreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreamsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
