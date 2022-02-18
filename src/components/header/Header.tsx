import * as React from 'react';
import './Header.css';
import {AppBar, Box, Button, IconButton, LinearProgress, MenuItem, Toolbar, Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";


export function Header() {
    const status = useSelector<AppRootStateType>(state => state.app.appStatus);
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={'secondary'}/> }
            </AppBar>
        </Box>
    );
}
