import React from 'react';
import {Card, CardContent, CardHeader} from '@mui/material';
import {LoginForm} from '../../../components';

export function Login(): JSX.Element {
    return (
        <React.Fragment>
            <Card variant="outlined">
                <CardHeader>
                    WorkTime Tracker
                </CardHeader>
                <CardContent>
                    <LoginForm/>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}
