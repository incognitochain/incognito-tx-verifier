import React from 'react';
import { compose } from 'recompose';
import {
    VerifierTx as VerifierTxInstance,
    VERIFIER_TX_STATUS,
    gomobileServices,
} from 'incognito-chain-web-js/build/wallet';
import { InjectedFormProps, reduxForm } from 'redux-form';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useFormValue } from 'src/hooks';
import { ENVS } from 'src/configs';
import { FORM_CONFIGS } from './VerifierTx.constant';

interface IProps {}

interface TInner {
    handleVerifierTx: () => any;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const [txId] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.fieldTxId });
    const [senderSeal] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.fieldSenderSeal });
    const [paymentAddress] = useFormValue({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.fieldPaymentAddress,
    });

    const handleVerifierTx = (data: any) => {
        try {
            console.log(txId, senderSeal, paymentAddress);
            console.log('data', data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoadWasm = async () => {
        try {
            if (typeof gomobileServices.loadWasm === 'function') {
                console.log('LOAD WASM URL', `${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`);
                const result = await gomobileServices.loadWasm(`${ENVS.REACT_APP_DOMAIN_URL}/privacy.wasm`);
                console.log('result', result);
                let verifierTxInst = new VerifierTxInstance();
                console.log('VerifierTxInstance', verifierTxInst);
                verifierTxInst.setRPCClient('https://testnet.incognito.org/fullnode');
                const txId = 'e77043447f1993ecc92ff2be219b87ccc90e84454dc70fe914d949485450fea2';
                const senderSeal = 'd99071adad109362780b6d4b025dceeb7e84d065112b3302c57dbce1d3706a0200000001';
                const paymentAddress =
                    '12snj4DSGwAHfeTh5mxpfqgjRRogVtuej3A9rVBHvXWxwM8Zb4GFgEuhbxrxJBHvnzB4KPsnsVP7s3cQAr77usYFdGeMEJ17bTCCrnMLzGZAX8uLK2ejK1naJinAtetqGJkHujFN1HuFJGUzeoEr';
                const otaKey =
                    '14yCTpkbAxREZ7GPVBe7hF3U71F9vjVBrEf8fjTbx7efRWfsYQd7bEzHuAjqu1JBUgyCfpYWdDzdi2iocw3sK7Ekvfua4wNuQJW3npC';
                console.log('verifierTxInst.verifySentTx', verifierTxInst.verifySentTx);
                console.log('verifierTxInst.verifyReceivedTx', verifierTxInst.verifyReceivedTx);
                if (typeof verifierTxInst.verifySentTx === 'function') {
                    console.log('AAAA');
                    try {
                        const reVerifierSentTx = await verifierTxInst.verifySentTx({
                            txId,
                            senderSeal,
                            paymentAddress,
                        });
                        console.log('BBB');
                        console.log('reVerifierSentTx', reVerifierSentTx);
                    } catch (error) {
                        console.log('error', error);
                    }
                }

                if (typeof verifierTxInst.verifyReceivedTx === 'function') {
                    const reVerifierReceiverTx = await verifierTxInst.verifyReceivedTx({
                        txId,
                        otaKey,
                    });
                    console.log('reVerifierReceiverTx', reVerifierReceiverTx);
                }
            }
        } catch (error) {
            console.log('CAN NOT IMPLEMENT GO METHODS BY WASM', error);
        }
    };

    React.useEffect(() => {
        handleLoadWasm();
    }, []);

    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleVerifierTx }} />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
