import * as types from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  user: null,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS: {
      return { ...state, authenticated: true, user: action.user };
    }

    case types.LOGIN_FAILED: {
      return { ...state, error: action.error };
    }

    case types.LOGOUT: {
      return initialState;
    }

    default:
      return state;
  }
}
