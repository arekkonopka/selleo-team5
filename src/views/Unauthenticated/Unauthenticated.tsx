import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import {Login} from '../index';

export function Unauthenticated(): JSX.Element {
    return (
        <Switch>
            <Route exact path={`/auth/login`}>
                <Login/>
            </Route>
        </Switch>
    );
}
