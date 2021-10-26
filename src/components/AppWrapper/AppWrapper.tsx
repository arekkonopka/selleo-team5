import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Authenticated, Unauthenticated} from '../../views';
import {GuardedRoute} from '../GuardedRoute/GuardedRoute';
import useAuth from '../../hooks/useAuth';

export const AppWrapper: React.FC = (): JSX.Element => {
    const {isLoggedIn} = useAuth();

    return (
        <Switch>
            <Route path="/auth">
                <Unauthenticated/>
            </Route>
            <GuardedRoute component={Authenticated} path="/" auth={isLoggedIn}/>
        </Switch>
    );
}