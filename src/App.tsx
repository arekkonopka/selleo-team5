import React from 'react';
import {useSelector} from 'react-redux';
import {ThemeProvider} from '@mui/material/styles';
import {CssBaseline, StyledEngineProvider} from '@mui/material';
import {AppProviders, AppWrapper} from './components';
import {theme} from './themes';
import NavigationScroll from './layout/NavigationScroll';

export function App(): JSX.Element {
    const customization = useSelector((state: any) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline/>
                <NavigationScroll>
                    <AppProviders>
                        <AppWrapper/>
                    </AppProviders>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
