import React from 'react';
import { MainCard } from '../../../ui-component/cards/MainCard';
import BundlesList from '../../../components/Settings/BundlesList/BundlesList';

const Settings = () => {
    return (
        <MainCard title="Settings">
            <BundlesList/>
        </MainCard>
    );
};

export default Settings;
