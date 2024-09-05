import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
})
export class AboutComponent {
  tutors = [
    {
      name: 'Divya Darshi',
      subject: 'Mathematics',
      rate: '₹1500/hr',
      rating: '4.9 ⭐',
      experience: '2000 Hr Teaching Experience',
      image: 'path-to-image-1.jpg'
    },
    // Add other tutors here
  ];
}
