import { Component } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/User/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 user: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (user: User | null) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error fetching user details:', error);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
