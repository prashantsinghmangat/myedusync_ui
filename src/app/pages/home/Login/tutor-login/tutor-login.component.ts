import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'tutor-profile',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.scss'],
  imports: [FormsModule]
})
export class TutorLoginComponent {}
