import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Password } from '../models/passwrod';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post<User>(this.baseUrl + "account/login", model).pipe(
      map((response: User) => {
        const user = response;
        if (user) this.setCurrentUser(user);
      })
    )
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map(response => {
        const user = response;
        if (user) this.setCurrentUser(user);
      })
    )
  }
  
  Logout() {
    localStorage.removeItem("user")
    this.currentUserSource.next(null);
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  verifyAccount(token: string) {
    const params = new HttpParams().set('token', token);
    return this.http.get(this.baseUrl + 'account/verify', { params });
  }

  forgotPassword(email: string) {
    return this.http.post(this.baseUrl + 'account/forgot-password', { email });
  }

  resetPassword(passwordData: Password) {
    return this.http.post(this.baseUrl + 'account/reset-password', passwordData);
  }
}
