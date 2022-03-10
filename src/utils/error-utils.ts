import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../state/app-reducer';
import { Dispatch } from 'redux';
import { ResponseType } from '../api/todolists-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({appStatus: 'failed'}))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>