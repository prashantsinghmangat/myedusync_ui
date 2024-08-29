import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tutor-page',
  standalone: true,
  imports: [],
  templateUrl: './tutor-page.component.html',
  styleUrl: './tutor-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorPageComponent {}
