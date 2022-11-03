import { User } from 'src/app/shared/models/user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: authActions.AuthActions
) {
  switch (action.type) {
    case authActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
        authError: null,
        loading: false,
      };

    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    case authActions.LOGIN_START:
    case authActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case authActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
      };

    case authActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };

    default:
      return state;
  }
}
