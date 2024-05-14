import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../Models/user.model';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    this.authService.currentUser.subscribe(user => {
      this.currentUserSubject.next(user);
    });

    if (this.authService.isLoggedIn()) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        this.authService.decodeToken(token);
      }
    }
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  logout(): void {
    this.authService.logout();
    this.currentUserSubject.next(null);
  }
}
