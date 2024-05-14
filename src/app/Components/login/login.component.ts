import { Component } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router:Router) { }

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.isAuthenticated = true;
          this.loginError = false;
          this.router.navigate([''])
        } else {
          this.loginError = true;
        }
      },
      error: (error: any) => {
        this.loginError = true;
        console.error('Login failed:', error);
      }
    });
  }
}
