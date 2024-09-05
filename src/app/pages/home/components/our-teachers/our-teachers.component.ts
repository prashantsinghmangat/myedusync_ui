import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'our-teachers',
  standalone: true,
  imports: [],
  templateUrl: './our-teachers.component.html',
  styleUrl: './our-teachers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurTeacherComponent {}
