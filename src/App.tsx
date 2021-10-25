import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import React from 'react';
import {Authenticated, Unauthenticated} from './views';
import {GuardedRoute, LoginForm} from './components';

export function App(): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route path="/auth">
                    <Unauthenticated/>
                </Route>
            </Switch>

            <Switch>
                <Route component={LoginForm} exact path='/'/>
                <GuardedRoute component={Authenticated} exact path="/tracker" auth={true}/>
            </Switch>
        </Router>
    );
}

export default App;