import React from 'react';
import {Route, Redirect} from 'react-router-dom';

// @ts-ignore
export const GuardedRoute = ({component: Component, auth, ...rest}) => (
    <Route {...rest} render={(props) => (
        auth === true
            ? <Component {...props} />
            : <Redirect to='/auth/login'/>
    )}/>
);