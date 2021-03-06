import { AuthActionTypes } from './auth.actions'

const initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false as boolean | null,
  captchaUrl: null as string | null,
}

export type InitialStateType = typeof initialState

export const authReducer = (
  state = initialState,
  action: AuthActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA': {
      return {
        ...state,
        ...action.payload,
      }
    }

    case 'GET_CAPTCHA_URL_SUCCESS': {
      return {
        ...state,
        ...action.payload,
      }
    }

    default:
      return state
  }
}
