import React from 'react';
import { compose } from 'recompose';
import { VerifierTx as VerifierTxInstance, gomobileServices } from 'incognito-chain-web-js/build/wallet';
import { InjectedFormProps, reduxForm, reset, isDirty } from 'redux-form';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { ENVS } from 'src/configs';
import { activeTabSelector } from 'src/components/Core/Tabs/Tabs.selector';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingIcon } from 'src/components/Icons';
import { FORM_CONFIGS } from './VerifierTx.constant';
import { serverSelector } from '../Setting';

interface IProps {}

interface TInner {
    handleVerifierTx: () => any;
    handleClearForm: () => any;
    result: string;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const formatResult = ({
    coinPosition,
    nConfirms,
    requiredConfirmations = 5,
}: {
    coinPosition: number;
    nConfirms: number;
    requiredConfirmations?: number;
}) => {
    return coinPosition < 0
        ? 'FAILED: TX does not include such transfer'
        : nConfirms <= 0
        ? 'MISSING: TX is not yet known by network'
        : nConfirms < requiredConfirmations
        ? `PENDING: transfer is included at UTXO #${coinPosition}\nConfirmations: ${nConfirms}`
        : `ACCEPTED: transfer is included at UTXO #${coinPosition}\nConfirmations: ${nConfirms}`;
};

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const activeTab = useSelector(activeTabSelector);
    const [loadedWasm, setLoadedWasm] = React.useState(false);
    const server = useSelector(serverSelector);
    const [result, setResult] = React.useState('');
    const dispatch = useDispatch();
    const handleVerifierTx = async (data: any) => {
        let initData = {
            coinPosition: 0,
            nConfirms: 0,
        };
        try {
            await setResult('');
            let verifierTxInst = new VerifierTxInstance();
            verifierTxInst.setRPCClient(server.chainURL);
            switch (activeTab) {
                case 0: {
                    const { txId, senderSeal, paymentAddress } = data;
                    initData = await verifierTxInst.verifySentTx({
                        txId,
                        senderSeal,
                        paymentAddress,
                    });
                    break;
                }
                case 1: {
                    const { txId, otaKey } = data;
                    initData = await verifierTxInst.verifyReceivedTx({
                        txId,
                        otaKey,
                    });
                    break;
                }
                default:
                    break;
            }
            setResult(formatResult(initData));
        } catch (error) {
            setResult(error?.message || JSON.stringify(error));
        }
    };

    const handleLoadWasm = async () => {
        try {
            if (typeof gomobileServices.loadWasm === 'function') {
                console.log('LOAD WASM URL', `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`);
                await gomobileServices.loadWasm(`${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`);
                setLoadedWasm(true);
            }
        } catch (error) {
            console.log('CAN NOT IMPLEMENT GO METHODS BY WASM', error);
        }
    };
    const handleClearForm = () => {
        dispatch(reset(FORM_CONFIGS.formName));
        setResult('');
    };
    React.useEffect(() => {
        handleLoadWasm();
    }, []);
    if (!loadedWasm) {
        return <LoadingIcon center />;
    }
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleVerifierTx, handleClearForm, result }} />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
