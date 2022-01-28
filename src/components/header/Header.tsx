import * as React from 'react';
import './Header.css';
import {AppBar, Box, Button, IconButton, MenuItem, Toolbar, Typography} from "@material-ui/core";


export function Header() {
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
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
