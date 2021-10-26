import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import './styles/styles.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

const client = new ApolloClient({
    uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ApolloProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
