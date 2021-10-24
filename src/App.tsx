import {
    BrowserRouter as Router,
    Switch,
    Route, BrowserRouter,
} from 'react-router-dom';
import React from 'react';
import { Authenticated, Unauthenticated } from './views';
import { GuardedRoute } from './components';
import useAuth from './hooks/useAuth';
import { AuthProvider } from './contexts/AuthProvider';

export function App(): JSX.Element {
    const {isLoggedIn} = useAuth();

    return (
        <BrowserRouter>
            <AuthProvider>
                <Router>
                    <Switch>
                        <Route path="/auth">
                            <Unauthenticated/>
                        </Route>
                        <GuardedRoute component={Authenticated} exact path="/" auth={isLoggedIn}/>
                    </Switch>
                </Router>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;