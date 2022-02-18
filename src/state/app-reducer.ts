const initialState: InitialStateType = {
    error: null,
    appStatus: 'idle',
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

export type InitialStateType = {
    error: string | null,
    appStatus: RequestStatusType,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, appStatus: action.appStatus}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>;
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type setAppLoaderStatusActionType = ReturnType<typeof setAppLoaderStatusAC>;

type ActionsType = setAppErrorActionType | setAppStatusActionType | setAppLoaderStatusActionType;