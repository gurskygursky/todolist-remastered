import * as React from 'react';
import './Header.css';
import {AppBar, Box, Button, IconButton, LinearProgress, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {logoutTC} from "../../state/auth-reducer";


export function Header() {
    const status = useSelector<AppRootStateType>(state => state.app.appStatus);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const LogoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" className={"header"}>
                <Toolbar>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuItem/>
                    </IconButton>
                    <Typography variant="h6">
                        TODOLIST
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={LogoutHandler}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/> }
            </AppBar>
        </Box>
    );
}
