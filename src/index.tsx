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
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const client = new ApolloClient({
    uri: 'https://worklog-on-steroids.herokuapp.com/api/ql_open',
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ApolloProvider client={client}>
                    <BrowserRouter>
                        <App/>
                    </BrowserRouter>
                </ApolloProvider>
            </LocalizationProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
