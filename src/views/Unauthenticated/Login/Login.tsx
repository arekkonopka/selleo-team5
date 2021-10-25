import React from 'react';
import {CardContent} from '@mui/material';
import {LoginForm} from '../../../components';

export function Login(): JSX.Element {
    return (
        <React.Fragment>
            <CardContent>
                <LoginForm/>
            </CardContent>
        </React.Fragment>
    );
}
