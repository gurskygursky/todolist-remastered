import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)

// thunks
export const loginTC = (authData: LoginParamsType) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(authData)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    // alert('YO')
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(setAppStatusAC('failed'))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(setAppStatusAC('failed'))
            })
    }
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType;