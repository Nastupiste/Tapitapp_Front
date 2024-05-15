import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { TokenPayload } from '../../Models/tokenPayload.model';
import { User } from '../../Models/user.model';
import { TokenResponse } from '../../Models/tokenResponse.model';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  access: string;
  user: any; // Asume que la respuesta incluye algún dato del usuario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://127.0.0.1:8000/api/v1/login';
  currentUser: EventEmitter<User | null> = new EventEmitter<User | null>();

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Método para iniciar sesión y guardar el token en el localStorage
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<TokenResponse>(this.authUrl, { username, password }).pipe(
      map((resp) => {
        if (isPlatformBrowser(this.platformId)) {
          console.log('Accediendo al token desde la llamada a la API.');
          this.decodeToken(resp.access);
          localStorage.setItem('accessToken', resp.access);
          localStorage.setItem('refreshToken', resp.refresh);
          this.router.navigate(['']);
        }
        return true;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  // Método para comprobar si se ha iniciado sesión
  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessToken') !== null;
    }
    return false;
  }

  // Método para cerrar sesión y eliminar el token del localStorage
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    this.clearCurrentUser();
    this.router.navigate(['/login']);
  }

  // Método para decodificar el token y almacenar los datos del usuario
  decodeToken(token: string): void {
    const tokenDecoded = jwtDecode<TokenPayload>(token);
    if (tokenDecoded) {
      const user: User = {
        id: tokenDecoded.user_id,
        username: tokenDecoded.username,
        is_owner: tokenDecoded.is_owner,
        is_admin: tokenDecoded.is_admin,
      };
      this.currentUser.emit(user);
      console.log(user);
    } else {
      console.error('No se pudo decodificar el token');
      this.currentUser.emit(null);
    }
  }

  // Método para limpiar el usuario actual
  private clearCurrentUser(): void {
    this.currentUser.emit(null);
  }
}
