import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Auth0ProviderWithHistory from './contexts/Auth0ProviderWithHistory';
import { LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Auth0ProviderWithHistory>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <App/>
                    </LocalizationProvider>
                </Auth0ProviderWithHistory>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
