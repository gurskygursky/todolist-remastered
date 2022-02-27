import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";
import {loginTC} from "../../state/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import { Navigate } from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {

    const dispatch = useDispatch();
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            const passwordRegex = /(?=.*[0-9])/;
            if (!values.password) {
                errors.password = "Required";
            } else if (values.password.length < 8) {
                errors.password = "Password must be 8 characters long.";
            } else if (!passwordRegex.test(values.password)) {
                errors.password = "Invalid password. Must contain one number.";
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values));
            // alert(JSON.stringify(values));
            formik.resetForm();
        },
    })

    if (isLoggedIn) {
        return (
            <Navigate to={'/'}/>
        )
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email"
                                   margin="normal"
                                   {...formik.getFieldProps('email')}
                        />
                        {
                            formik.touched.email &&
                            formik.errors.email
                                ? <div style={{color: 'red'}}>{formik.errors.email}</div>
                                : null}
                        {error ? <span style={{color: 'crimson'}}>{error}</span> : null}
                        <TextField
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {
                            formik.touched.password &&
                            formik.errors.password
                                ? <div style={{color: 'red'}}>{formik.errors.password}</div>
                                : null}
                        {error ? <span style={{color: 'crimson'}}>{error}</span> : null}
                        <FormControlLabel label={'Remember me'}
                                          control={<Checkbox
                                              {...formik.getFieldProps('checkbox')}
                                          />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                        <ErrorSnackbar/>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
