import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    error: null,
    appStatus: 'idle',
    isInitialized: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error;
        },
        setAppStatusAC: (state, action: PayloadAction<{ appStatus: RequestStatusType }>) => {
            state.appStatus = action.payload.appStatus
        },
        setAppInitializeAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    },
})

export const {
    setAppErrorAC,
    setAppStatusAC,
    setAppInitializeAC
} = appSlice.actions;
export const appReducer = appSlice.reducer;


//actions
// export const setAppErrorAC = (error: string | null) => ({
//     type: 'APP/SET_ERROR',
//     error,
// } as const);
// export const setAppStatusAC = (appStatus: RequestStatusType) => ({
//     type: 'APP/SET_STATUS',
//     appStatus,
// } as const);
// export const setAppLoaderStatusAC = (id: string, appStatus: RequestStatusType) => ({
//     type: 'APP/SET_LOADER_STATUS',
//     id,
//     appStatus,
// } as const);
// export const setAppInitializeAC = (initValue: boolean) => ({
//     type: 'APP/SET_IS_INITIALIZED',
//     initValue,
// } as const);

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
        dispatch(setAppInitializeAC({isInitialized: true}))
    })
}


type InitialStateType = {
    error: string | null,
    appStatus: RequestStatusType,
    isInitialized: boolean,
}

// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET_STATUS':
//             return {...state, appStatus: action.appStatus}
//         case 'APP/SET_ERROR':
//             return {...state, error: action.error}
//         case "APP/SET_IS_INITIALIZED":
//             return {...state, isInitialized: action.initValue}
//         default:
//             return state
//     }
// }

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
// export type SetAppLoaderStatusActionType = ReturnType<typeof setAppLoaderStatusAC>;
// export type SetAppInitializeActionType = ReturnType<typeof setAppInitializeAC>;

// type ActionsType =
//     SetAppErrorActionType
//     | SetAppStatusActionType
//     | SetAppLoaderStatusActionType
//     | SetAppInitializeActionType;