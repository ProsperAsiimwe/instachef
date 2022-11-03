import { of } from 'rxjs';
import * as AuthActions from '../../auth/store/auth.actions';
import { User } from '../models/user.model';

export const handleAuthenticationSuccess = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

  //Write data to local storage
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));

  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
  });
};

export const handleAuthenticationError = (errorRes: any) => {
  let errorMessage = 'An unknown error occured!';

  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email already exists.';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'Invalid email!';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Invalid password!';
      break;
  }

  return of(new AuthActions.AuthenticateFail(errorMessage));
};
