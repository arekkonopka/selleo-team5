import { useRoutes } from 'react-router-dom';
import { MainRoutes } from './MainRoutes';
import config from '../config';

export function ThemeRoutes() {
    return useRoutes([MainRoutes], config.basename);
}
