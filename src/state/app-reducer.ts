const initialState: InitialStateType = {
    error: null,
    status: 'idle',
}

export const setErrorAC = (error: string | null) => ({
    type: 'APP/SET_ERROR',
    error,
} as const);
export const setStatusAC = (status: RequestStatusType) => ({
    type: 'APP/SET_STATUS',
    status,
} as const);

export type InitialStateType = {
    error: string | null,
    status: RequestStatusType,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type setErrorActionType = ReturnType<typeof setErrorAC>;
export type setStatusActionType = ReturnType<typeof setStatusAC>;

type ActionsType = setErrorActionType | setStatusActionType;