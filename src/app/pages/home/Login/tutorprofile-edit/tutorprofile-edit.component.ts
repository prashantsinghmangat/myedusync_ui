import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'tutorprofile-edit',
  templateUrl: './tutorprofile-edit.component.html',
  styleUrls: ['./tutorprofile-edit.component.scss'],
  imports: [FormsModule, CommonModule]  // Include CommonModule here to use ngFor
})
export class TutorProfileEditComponent {
  profile = {
    name: '',
    phone: '',
    designation: '',
    location: '', // Adding location property here
    shortBio: '',
    aboutMe: '',
    skills: ''
  };

  workExperience = [
    { company: '', designation: '', startDate: '', endDate: '' }
  ];

  education = [
    { university: '', degree: '', startDate: '', endDate: '' }
  ];

  addExperience() {
    this.workExperience.push({ company: '', designation: '', startDate: '', endDate: '' });
  }

  removeExperience(index: number) {
    this.workExperience.splice(index, 1);
  }

  addEducation() {
    this.education.push({ university: '', degree: '', startDate: '', endDate: '' });
  }

  removeEducation(index: number) {
    this.education.splice(index, 1);
  }

  imageUrl: string | ArrayBuffer | null = null;

  handleImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
        // Check the file size (e.g., 5MB max)
        if (file.size > 5242880) { // 5 * 1024 * 1024
            alert("File is too large. Maximum size allowed is 5MB.");
            return;
        }

        const img = new Image();
        img.src = window.URL.createObjectURL(file);
        img.onload = () => {
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            window.URL.revokeObjectURL(img.src);

          
            // If all checks pass, read and display the image
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.imageUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        };
    }
}

}