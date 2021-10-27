import { Suspense } from 'react';
import { Loader } from './Loader';

export const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Loader/>}>
            <Component {...props} />
        </Suspense>
    );
