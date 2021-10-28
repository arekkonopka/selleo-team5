import React from 'react';
import { MainCard } from '../../../ui-component/cards/MainCard';
import { BundlesList } from '../../../components/Management/BundlesManagement/BundlesList/BundlesList';

function Management(): JSX.Element {
    return (
            <MainCard title="Management">
                <BundlesList/>
            </MainCard>
    );
}

export default Management;
