import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTeacherComponent } from './our-teachers.component';

describe('OurTeacherComponent', () => {
  let component: OurTeacherComponent;
  let fixture: ComponentFixture<OurTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTeacherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OurTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
