import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpraysComponent } from './sprays.component';

describe('SpraysComponent', () => {
  let component: SpraysComponent;
  let fixture: ComponentFixture<SpraysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpraysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpraysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
