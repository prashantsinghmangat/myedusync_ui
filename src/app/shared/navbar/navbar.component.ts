import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

import { AccountService } from './../../login-auth/_services';
import { User } from './../../login-auth/_models';

@Component({
  selector: 'til-navbar',
  standalone: true,
  imports: [AuthModalComponent, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  showAuthModalSig = signal(false);
  // user$ = this.userService.user$;

  user?: User | null;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
    private accountService: AccountService,
    @Inject(PLATFORM_ID) private readonly platformId: string,
  ) {
    this.accountService.user.subscribe(x => this.user = x);
    console.log("log user: ", this.user)
    // this.loadUser();
  }

  logout() {
    this.accountService.logout();
  }

  // logout(): void {
  //   this.userService.clearUser();
  //   this.authService.logout().pipe(take(1)).subscribe();
  //   this.router.navigate(['/']);
  // }

  toggleAuthModal(): void {
    this.showAuthModalSig.update((value) => !value);
  }

  closeMenu() {
    (document.activeElement as any)?.blur();
  }

  private loadUser() {
    this.userService
      .getUser()
      .pipe(
        take(1),
        tap(() => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('isLoggedIn', '1');
          }
        }),
      )
      .subscribe();
  }
}
