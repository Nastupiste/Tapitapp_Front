import { Component } from '@angular/core';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentUser: User | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.currentUser.subscribe({
      next: (user: User | null) => {
        this.currentUser = user;
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
