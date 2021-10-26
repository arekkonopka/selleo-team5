import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { theme } from './themes';
import { ThemeRoutes } from './routes';
import { NavigationScroll } from './layout/NavigationScroll';

export function App(): JSX.Element {
    const customization = useSelector((state: any) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline/>
                <NavigationScroll>
                    <ThemeRoutes/>
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;
