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

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (user: User | null) => {
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
