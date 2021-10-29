import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ApolloProvider } from '@apollo/client';
import { Loader } from '../../ui-component/Loader';
import { GraphqlClient } from '../../utils/GraphqlClient';
import { useDispatch } from 'react-redux';
import { SET_PROFILE } from '../../store/actions';

export const AppProviders: React.FC = ({children}) => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const dispatch = useDispatch();
    const {user, isAuthenticated, loginWithRedirect, isLoading, getAccessTokenSilently, getIdTokenClaims} = useAuth0();

    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (isAuthenticated && !accessToken) {
            getToken();
        }
    }, [isLoading, isAuthenticated, accessToken]);

    if (isLoading) {
        return <Loader/>
    }

    if (!isAuthenticated) {
        // loginWithRedirect({
        //     audience: 'graphql-api',
        //     scope: 'read',
        // });
    }

    const getToken = async () => {
        const token: string = await getAccessTokenSilently({audience: 'graphql-api'});
        const claims = await getIdTokenClaims({audience: 'graphql-api'});
        dispatch({type: SET_PROFILE, profile: claims});
        setAccessToken(token);
    };

    if (!accessToken) {
        return <Loader/>
    }

    const client = GraphqlClient(user?.nickname ?? '', accessToken || '');

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}
