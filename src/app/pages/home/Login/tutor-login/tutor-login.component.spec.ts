import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorLoginComponent } from './tutor-login.component';

describe('AboutUsComponent', () => {
  let component: TutorLoginComponent;
  let fixture: ComponentFixture<TutorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TutorLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TutorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
