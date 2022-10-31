import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // userSubject = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  /**
   *
   * @param email
   * @param password
   * @param username
   * @param phone
   * @returns
   */
  signUp(email: string, password: string, username: string, phone: string) {
    return this.http
      .post<AuthResponseData>(
        environment.firebaseSignUp + environment.googleAPIKeyFirebase,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandlerService.firebaseAuthErrors),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   *
   * @param email
   * @param password
   */
  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        environment.firebaseSignIn + environment.googleAPIKeyFirebase,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandlerService.firebaseAuthErrors),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  /**
   *
   */
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      //  this.userSubject.next(loadedUser);

      this.store.dispatch(
        new AuthActions.Login({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate),
        })
      );

      // get difference in milliseconds
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);
    }
  }

  /**
   *
   */
  logOut() {
    // this.userSubject.next(null);

    this.store.dispatch(new AuthActions.Logout());

    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  }

  /**
   *
   * @param expirationDuration
   */
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  /**
   *
   * @param email
   * @param userId
   * @param token
   * @param expiresIn
   */
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number //seconds
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    const user = new User(email, userId, token, expirationDate);

    this.store.dispatch(
      new AuthActions.Login({
        email: email,
        userId: userId,
        token: token,
        expirationDate: expirationDate,
      })
    );

    this.autoLogout(expiresIn * 1000); // milliseconds

    localStorage.setItem('userData', JSON.stringify(user));
  }
}

// NOTES:
/**
 * tap: operator that allows us to perform an action without changing the response
 * BehaviorSubject: Unlike a normal Subject, it always gives us access to the previous value hence ensuring that we can get access
 * to the user even if in this part of the application where we need it, we missed the previous user update.
 */
