import React from 'react';
import {AppBar, Box, Button, IconButton, List, ListItem, Toolbar, Typography} from '@mui/material';

export function Authenticated(): JSX.Element {
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
