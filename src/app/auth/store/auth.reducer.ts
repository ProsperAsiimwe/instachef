import { User } from 'src/app/shared/models/user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(
  state = initialState,
  action: authActions.AuthActions
) {
  switch (action.type) {
    case authActions.LOGIN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user: user,
      };

    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
