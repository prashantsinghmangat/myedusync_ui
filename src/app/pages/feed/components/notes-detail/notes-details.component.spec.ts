import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotesDetailComponent } from './notes-details.component';

describe('NotesDetailComponent', () => {
  let component: NotesDetailComponent;
  let fixture: ComponentFixture<NotesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
