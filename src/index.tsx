import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './assets/scss/style.scss';

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
