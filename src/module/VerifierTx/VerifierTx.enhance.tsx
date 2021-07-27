import React from 'react';
import { compose } from 'recompose';
import { InjectedFormProps, reduxForm } from 'redux-form';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useFormValue } from 'src/hooks';
import { FORM_CONFIGS } from './VerifierTx.constant';

interface IProps {}

interface TInner {
    handleVerifierTx: () => any;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const [txId] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.fieldTxId });
    const [senderSeal] = useFormValue({ formName: FORM_CONFIGS.formName, field: FORM_CONFIGS.fieldSenderSeal });
    const [receiverAddress] = useFormValue({
        formName: FORM_CONFIGS.formName,
        field: FORM_CONFIGS.fieldReceiverAddress,
    });

    const handleVerifierTx = (data: any) => {
        console.log(txId, senderSeal, receiverAddress);
        console.log('data', data);
    };
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
