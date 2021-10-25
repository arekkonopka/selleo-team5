import React from 'react';
import {AuthProvider} from '../../contexts/AuthProvider';

export const AppProviders: React.FC = ({children}) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    );
}