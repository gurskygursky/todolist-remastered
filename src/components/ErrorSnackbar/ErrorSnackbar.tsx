import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {AlertProps} from '@material-ui/lab';
import MuiAlert from '@material-ui/lab/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setErrorAC} from "../../state/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(null));
    };

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {error}
            </Alert>
        </Snackbar>

    );
}