import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { theme } from './themes';
import { NavigationScroll } from './layout/NavigationScroll';
import { AppProviders, AppWrapper } from './components';

export function App(): JSX.Element {
    const customization = useSelector((state: any) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <AppProviders>
                <ThemeProvider theme={theme(customization)}>
                    <CssBaseline/>
                    <NavigationScroll>
                        <AppWrapper/>
                    </NavigationScroll>
                </ThemeProvider>
            </AppProviders>
        </StyledEngineProvider>
    );
}

export default App;
