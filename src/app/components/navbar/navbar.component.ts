import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
  constructor(public auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout(); // Remove token from localStorage
    this.router.navigate(['/login']); // Navigate to the login page
  }
}
