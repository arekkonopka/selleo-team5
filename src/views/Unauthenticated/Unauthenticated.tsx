import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import {Login} from '../index';

export function Unauthenticated(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route exact path={`/auth/login`}>
                    <Login></Login>
                </Route>
            </Switch>
        </Router>
    );
}
