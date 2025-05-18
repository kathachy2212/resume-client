import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'resume-app';

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Optionally you can check login status when the app starts
    console.log('Is logged in:', this.authService.isLoggedIn());
  }
}
