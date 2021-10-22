import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import { Login } from '../index';

export class Unauthenticated extends React.Component<any, any> {

    public render(): JSX.Element {
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
}
