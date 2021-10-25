import {useContext} from 'react';
import {AuthContext, AuthContextType} from '../contexts/AuthProvider';

export default function useAuth(): AuthContextType {
    return useContext(AuthContext);
}
