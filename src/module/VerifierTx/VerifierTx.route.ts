import { lazy } from 'react';
import { IRouteProps } from 'src/module';

const verifierTxRoute: IRouteProps = {
    path: '/',
    exact: true,
    component: lazy(() => import('./VerifierTx')),
    name: 'Verifier Tx',
    to: '/',
};

export const route = verifierTxRoute.path;

export default verifierTxRoute;
