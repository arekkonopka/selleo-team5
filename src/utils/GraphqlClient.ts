import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const GraphqlClient = (username: string, accessToken: string) => {
    const httpLink = createHttpLink({
        // uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
        uri: 'https://worklog-on-steroids.herokuapp.com/api/ql',
    });

    const authLink = setContext((_, {headers}) => {
        return {
            headers: {
                ...headers,
                // 'user-name': username ? username : '',
                'Authorization': `Bearer ${accessToken}`,
            },
        };
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};
