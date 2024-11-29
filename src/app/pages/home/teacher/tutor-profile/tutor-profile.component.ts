import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'tutor-profile',
  standalone: true,
  imports: [],
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorProfileComponent { 

  constructor(private router: Router) { }

  editProfile() {
    this.router.navigate(['/tutorprofile-edit']); // This will navigate to the teacher profile page
  }

  createcourse() {
    this.router.navigate(['/create-course']); // This will navigate to the teacher profile page


  }

}
