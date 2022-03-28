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

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        }
        dispatch(setAppInitializeAC({isInitialized: true}))
    })
}

//types
type InitialStateType = {
    error: string | null,
    appStatus: RequestStatusType,
    isInitialized: boolean,
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;