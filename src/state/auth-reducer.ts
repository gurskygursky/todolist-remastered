import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {authAPI, LoginParamsType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {logoutClearDataAC, LogoutClearDataActionType} from "./todolists-reducer";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}
// type InitialStateType = typeof initialState

const todolistAuthSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC (state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value;
        }
    }
})

export const authReducer = todolistAuthSlice.reducer;
export const {setIsLoggedInAC} = todolistAuthSlice.actions;

// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'LOGIN/SET_IS_LOGGED_IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
// actions
// export const setIsLoggedInAC = (value: boolean) =>
//     ({type: 'LOGIN/SET_IS_LOGGED_IN', value} as const)

// thunks
export const loginTC = (authData: LoginParamsType) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>) => {
        dispatch(setAppStatusAC({appStatus: "loading"}))
        authAPI.login(authData)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    // alert('YO')
                    dispatch(setIsLoggedInAC({value: true}))
                    dispatch(setAppStatusAC({appStatus: 'succeeded'}))
                } else {
                    handleServerAppError(response.data, dispatch)
                    dispatch(setAppStatusAC({appStatus: 'failed'}))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(setAppStatusAC({appStatus: 'failed'}))
            })
    }
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType | LogoutClearDataActionType>) => {
    dispatch(setAppStatusAC({appStatus: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({appStatus: 'succeeded'}))
                dispatch(logoutClearDataAC())
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