import { Component } from '@angular/core';
import { AuthService } from '../../Services/Auth/auth.service';
import { User } from '../../Models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  user: User | null = null;
  urlFoto?: String = 'http://127.0.0.1:8000';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (user: User | null) => {
        console.log(user);
        this.user = user;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.userService.currentUserValue !== null;
  }

  logout(): void {
    this.userService.logout();
  }
}
