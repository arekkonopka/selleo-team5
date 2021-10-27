import { useRoutes } from 'react-router-dom';
import { MainRoutes } from './MainRoutes';
import { AuthenticationRoutes } from './AuthenticationRoutes';
import config from '../config';

export function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
