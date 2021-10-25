import React from 'react';
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from '@mui/material';
import useAuth from '../../hooks/useAuth';

export function Authenticated(): JSX.Element {
    const {logout} = useAuth();

    console.log('authenticated');

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        {/*<MenuIcon/>*/}
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}></Typography>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
