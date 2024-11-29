import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
  MARKED_OPTIONS,
  MarkedOptions,
  MarkedRenderer,
  provideMarkdown,
} from 'ngx-markdown';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { routes } from './app.routes';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';

// used to create fake backend
import { fakeBackendProvider } from './login-auth/_helpers';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  // Customizing the renderer to replace h1 tags with h2, but maintain h1 styling for SEO considerations.
  renderer.heading = (text: string, level: number) => {
    if (level === 1) {
      // Applying h2 tag but maintaining the style of h1
      return `<h2 class="text-4xl font-bold mt-8">${text}</h2>\n`;
    } else {
      // Handling other headings normally
      return `<h${level}>${text}</h${level}>\n`;
    }
  };

  return {
    renderer: renderer,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(FormsModule),  // Import FormsModule here
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: markedOptionsFactory(),
      },
    }),
     // provider used to create fake backend
        fakeBackendProvider
  ],
};
