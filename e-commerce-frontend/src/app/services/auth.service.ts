import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { ILoginPayload } from '../interfaces/login-payload.interface';
import { ApiService } from './api.service';
import * as HttpStatus from 'http-status-codes';
import { IUser } from '../interfaces/user.interrface';
import { Router } from '@angular/router';
import { ACCESS_TOKEN_KEY } from '../constants';
import { EUserRoles } from '../enums/user-roles.enum';
import { ISignupPayload } from '../interfaces/signup-payload.inteface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUser$ = new Subject<IUser | null>();
  public accessToken$ = new BehaviorSubject<string | null>(null);
  public isAdmin$: Observable<boolean | null>;

  constructor(
    private api: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    if (localStorage.getItem(ACCESS_TOKEN_KEY)) {
      this.accessToken$.next(localStorage.getItem(ACCESS_TOKEN_KEY));
      this.getProfile().toPromise();
    }
    this.isAdmin$ = this.currentUser$.pipe(
      map((u) => u && u.role === EUserRoles.admin)
    );
  }

  public login(payload: ILoginPayload): Observable<boolean> {
    return this.api.post<{ accessToken: string }>('auth/login', payload).pipe(
      tap((response) => {
        if (response.status === HttpStatus.CREATED) {
          localStorage.setItem(
            ACCESS_TOKEN_KEY,
            response.body?.accessToken || ''
          );
          this.accessToken$.next(response.body?.accessToken || '');
          this.router.navigate(['']);
          this.snackBar.open('Успешно', 'x', {
            panelClass: 'snackbar-success',
            duration: 2000,
          });
        }
      }),
      switchMap(() => this.getProfile()),
      catchError((e: HttpErrorResponse) => {
        this.snackBar.open(e.error.message, 'x', {
          panelClass: 'snackbar-error',
          duration: 2000,
        });
        return of(e);
      }),
      map((response) => !(response instanceof HttpErrorResponse))
    );
  }

  public signup(payload: ISignupPayload): Observable<boolean> {
    return this.api.post<{ accessToken: string }>('auth/signup', payload).pipe(
      tap((response) => {
        if (response.status === HttpStatus.CREATED) {
          localStorage.setItem(
            ACCESS_TOKEN_KEY,
            response.body?.accessToken || ''
          );
        }

        this.accessToken$.next(response.body?.accessToken || '');
        this.router.navigate(['']);
        this.snackBar.open('Успешно', 'x', {
          panelClass: 'snackbar-success',
          duration: 2000,
        });
      }),
      switchMap(() => this.getProfile()),
      catchError((e: HttpErrorResponse) => {
        this.snackBar.open(e.error.message, 'x', {
          panelClass: 'snackbar-error',
          duration: 2000,
        });
        return of(e);
      }),
      map((response) => !(response instanceof HttpErrorResponse))
    );
  }

  public getProfile(): Observable<boolean> {
    return this.api.get<{ user: IUser }>('auth/profile').pipe(
      map((res) => {
        if (res.status === HttpStatus.OK) {
          this.currentUser$.next(res.body?.user);
        }
        return true;
      })
    );
  }

  public logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.accessToken$.next(null);
    this.currentUser$.next(null);
  }
}
