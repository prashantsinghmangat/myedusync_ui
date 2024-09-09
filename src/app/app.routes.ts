import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Today I Learned — Share what you learned today',
  },
  {
    path: 'auth/oauth/:provider/callback',
    loadComponent: () =>
      import('./pages/oauth-callback/oauth-callback.component').then(
        (m) => m.OauthCallbackComponent,
      ),
    title: 'Authenticating...',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [authGuard],
    title: 'Profile',
  },
  {
    path: 'new-post',
    loadComponent: () =>
      import('./pages/new-post/new-post.component').then(
        (m) => m.NewPostComponent,
      ),
    canActivate: [authGuard],
    title: 'Write a post',
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./pages/feed/feed.component').then((m) => m.FeedComponent),
    title: 'Feed',
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./pages/post/post.component').then((m) => m.PostComponent),
  },
  {
    path: 'teacher-list',
    loadComponent: () =>
      import('./pages/home/components/teacher-list/teacher-list.component').then((m) => m.TeacherListComponent),
    title: 'Our-Teachers',
  },
  
  {
    path: 'about-us',
    loadComponent: () =>
      import('./pages/home/components/about-us/about-us.component').then((m) => m.AboutUsComponent),
    title: 'AboutUs',
  },
 

  {
    path: 'whiteboard',
    loadComponent: () =>
      import('./pages/home/components/whiteboard/whiteboard.component').then((m) => m.WhiteboardComponent),
    title: 'AboutUs',
  },

  {
    path: 'tutor-page',
    loadComponent: () =>
      import('./pages/home/components/tutor-page/tutor-page.component').then((m) => m.TutorPageComponent),
    title: 'Tutor',
  },

  {
    path: 'notes-detail/:id',
    loadComponent: () =>
      import('./pages/feed/components/notes-detail/notes-details.component').then((m) => m.NotesDetailComponent),
    title: 'Note Detail',
  },
  {
    path: 'legal/terms-of-service',
    loadComponent: () =>
      import('./pages/terms-of-service/terms-of-service.component').then(
        (m) => m.TermsOfServiceComponent,
      ),
  },
  {
    path: 'legal/privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
