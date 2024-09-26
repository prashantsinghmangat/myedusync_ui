import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from './../../login-auth/_services';

@Component({
  selector: 'tutor-profile',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.scss'],
})
export class TutorLoginComponent implements OnInit {
  form!: FormGroup;
  registerform!: FormGroup;
  loading = false;
  regloading = false;
  submitted = false;
  viewCheck = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get fregister() { return this.registerform.controls; }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerform = this.formBuilder.group({
      role: ['', Validators.required],
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[+0-9]{10,15}$/)]],
      location: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  formView() {
    this.viewCheck = !this.viewCheck;
  }

  onRegisterSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerform.invalid) {
      return;
    }

    console.log("this.registerform.value: ", this.registerform.value);
    // const registerPayload = {
    //   role: this.registerform.value.role,
    //   emailId: this.registerform.value.emailId,
    //   phoneNumber: this.registerform.value.phoneNumber,
    //   password: this.registerform.value.password,
    //   name: this.registerform.value.name,
    //   location: this.registerform.value.location
    // };
    this.regloading = true;
    // this.accountService.register(registerPayload)
    this.accountService.register(this.registerform.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.viewCheck = false;
        },
        error: error => {
          this.alertService.error(error);
          this.regloading = false;
        }
      });
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    // const loginReq = {
    //   emailId: this.f['username'].value,  // Access using bracket notation
    //   password: this.f['password'].value  // Access using bracket notation
    // };

    this.loading = true;
    // this.accountService.loginFromApi(loginReq)
    this.accountService.login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}