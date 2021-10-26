import React from 'react';
import {AppProviders, AppWrapper} from './components';

export function App(): JSX.Element {
    return (
        <AppProviders>
            <AppWrapper/>
        </AppProviders>
    );
}

export default App;
