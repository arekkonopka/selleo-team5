import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { theme } from './themes';
import { ThemeRoutes } from './routes';
import { NavigationScroll } from './layout/NavigationScroll';
import { AuthProvider } from './contexts/AuthProvider';

export function App(): JSX.Element {
    const customization = useSelector((state: any) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <AuthProvider>
                <ThemeProvider theme={theme(customization)}>
                    <CssBaseline/>
                    <NavigationScroll>
                        <ThemeRoutes/>
                    </NavigationScroll>
                </ThemeProvider>
            </AuthProvider>
        </StyledEngineProvider>
    );
}

export default App;
