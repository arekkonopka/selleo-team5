import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    ApolloProvider,
} from '@apollo/client';
import { Loader } from '../../ui-component/Loader';
import { GraphqlClient } from '../../utils/GraphqlClient';

export const AppProviders: React.FC = ({children}) => {
    const {user, isAuthenticated, loginWithRedirect, isLoading} = useAuth0();

    if (isLoading) {
        return <Loader/>
    }

    if (!isAuthenticated) {
        loginWithRedirect({
            audience: 'graphql-api',
            scope: 'read',
        });
    }

    console.log(user);

    const client = GraphqlClient(user?.nickname ?? '', '');

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}
