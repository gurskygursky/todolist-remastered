import {Dispatch} from "redux";
import { authAPI } from "../api/todolists-api";
import {setIsLoggedInAC} from "./auth-reducer";

const initialState: InitialStateType = {
    error: null,
    appStatus: 'idle',
    isInitialized: false,
}
//actions
export const setAppErrorAC = (error: string | null) => ({
    type: 'APP/SET_ERROR',
    error,
} as const);
export const setAppStatusAC = (appStatus: RequestStatusType) => ({
    type: 'APP/SET_STATUS',
    appStatus,
} as const);
export const setAppLoaderStatusAC = (id: string, appStatus: RequestStatusType) => ({
    type: 'APP/SET_LOADER_STATUS',
    id,
    appStatus,
} as const);
export const setAppInitializeAC = (initValue: boolean) => ({
    type: 'APP/SET_IS_INITIALIZED',
    initValue,
} as const);

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        }
        dispatch(setAppInitializeAC(true))
    })
}


export type InitialStateType = {
    error: string | null,
    appStatus: RequestStatusType,
    isInitialized: boolean,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, appStatus: action.appStatus}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        case "APP/SET_IS_INITIALIZED":
            return {...state, isInitialized: action.initValue}
        default:
            return state
    }
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setAppLoaderStatusActionType = ReturnType<typeof setAppLoaderStatusAC>;
export type setAppInitializeActionType = ReturnType<typeof setAppInitializeAC>;

type ActionsType = setAppErrorActionType | setAppStatusActionType | setAppLoaderStatusActionType | setAppInitializeActionType;