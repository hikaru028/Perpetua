import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTogglerComponent } from './slide-toggler.component';

describe('SlideTogglerComponent', () => {
  let component: SlideTogglerComponent;
  let fixture: ComponentFixture<SlideTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideTogglerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
