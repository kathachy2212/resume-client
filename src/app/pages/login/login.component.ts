import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/models';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials: LoginRequest = { username: '', password: '' };
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access); // Store JWT token in localStorage
        this.router.navigate(['/upload']); // Redirect to upload page after login
      },
      error: () => {
        this.error = 'Invalid credentials';
      },
    });
  }
}
