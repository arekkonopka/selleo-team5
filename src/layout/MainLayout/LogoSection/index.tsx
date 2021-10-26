import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import config from '../../../config';
import logo from '../../../assets/images/selleo-logo-alt.svg';
import './index.scss';

export const LogoSection = () => (
    <ButtonBase disableRipple component={Link} to={config.defaultPath}>
        <img alt="Logo" className="header-logo" src={logo}/>
    </ButtonBase>
);
