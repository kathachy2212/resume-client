import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      full_name: ['', Validators.required],
      username: ['', [Validators.required], [this.checkUsernameAvailability()]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Custom validator for password match
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm_password')?.value;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  // Async validator to check if username already exists
  checkUsernameAvailability() {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);
      return this.authService.checkUsername(control.value).pipe(
        debounceTime(300),
        map(res => res.exists ? { usernameTaken: true } : null)
      );
    };
  }

  register() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly.';
      return;
    }

    const { password, confirm_password, ...rest } = this.signupForm.value;

    const userData = { ...rest, password };

    this.authService.register(userData).subscribe({
      next: () => {
        this.successMessage = 'Registration successful!';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 400) {
          this.errorMessage = 'Registration failed: Invalid data sent.';
        } else {
          this.errorMessage = 'Registration failed. Please try again later.';
        }
      }
    });
  }
}
