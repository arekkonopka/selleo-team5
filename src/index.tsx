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
            <Auth0ProviderWithHistory>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                </LocalizationProvider>
            </Auth0ProviderWithHistory>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
