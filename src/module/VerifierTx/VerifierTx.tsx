import React, { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { isInvalid, isSubmitting, Field } from 'redux-form';
import { Button } from 'src/components/Core';
import { InputField, validator } from 'src/components/ReduxForm';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Setting';
import { HeaderApp } from 'src/components/Header';
import Tabs from 'src/components/Core/Tabs';
import { FORM_CONFIGS } from './VerifierTx.constant';
import withVerifierTx, { IMergeProps } from './VerifierTx.enhance';
import { IVerifierForm, IVerifierTxLanguage } from './VerifierTx.interface';

const Styled = styled.div`
    &.container {
        .btn-container {
            margin-top: 30px;
        }
    }
`;

const VerifySentTx = (props: IVerifierForm) => {
    const { handleSubmit, handleVerifierTx } = props;
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { txId, senderSeal, paymentAddress, btnSubmit } = translate;
    const submitting = useSelector((state) => isSubmitting(FORM_CONFIGS.formName)(state));
    const invalid = useSelector((state) => isInvalid(FORM_CONFIGS.formName)(state));
    const disabledForm = submitting || invalid;
    return (
        <form onSubmit={handleSubmit(handleVerifierTx)}>
            <Field
                component={InputField}
                name={FORM_CONFIGS.fieldTxId}
                validate={[validator.required]}
                componentProps={{
                    placeholder: txId.placeholder,
                }}
            />
            <Field
                component={InputField}
                name={FORM_CONFIGS.fieldSenderSeal}
                validate={[validator.required]}
                componentProps={{
                    placeholder: senderSeal.placeholder,
                }}
            />
            <Field
                component={InputField}
                name={FORM_CONFIGS.fieldPaymentAddress}
                validate={[validator.required]}
                componentProps={{
                    placeholder: paymentAddress.placeholder,
                }}
            />
            <Button title={`${btnSubmit}${submitting ? '...' : ''}`} disabled={disabledForm} type="submit" />
        </form>
    );
};

const VerifyReceivedTx = (props: IVerifierForm) => {
    const { handleSubmit, handleVerifierTx } = props;
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { txId, otaKey, btnSubmit } = translate;
    const submitting = useSelector((state) => isSubmitting(FORM_CONFIGS.formName)(state));
    const invalid = useSelector((state) => isInvalid(FORM_CONFIGS.formName)(state));
    const disabledForm = submitting || invalid;
    return (
        <form onSubmit={handleSubmit(handleVerifierTx)}>
            <Field
                component={InputField}
                name={FORM_CONFIGS.fieldTxId}
                validate={[validator.required]}
                componentProps={{
                    placeholder: txId.placeholder,
                }}
            />
            <Field
                component={InputField}
                name={FORM_CONFIGS.fieldOTAKey}
                validate={[validator.required]}
                componentProps={{
                    placeholder: otaKey.placeholder,
                }}
            />
            <Button title={`${btnSubmit}${submitting ? '...' : ''}`} disabled={disabledForm} type="submit" />
        </form>
    );
};

const VerifiedTxFrom = (props: { label: string } & HTMLAttributes<HTMLDivElement>) => {
    const { children, ...rest } = props;
    return (
        <div className="form-container" {...rest}>
            {children}
        </div>
    );
};

const VerifierTx = (props: IMergeProps) => {
    const { handleSubmit, handleVerifierTx } = props;
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { labelFormVerifiedReceivedTx, labelFormVerifiedSentTx } = translate;
    return (
        <Styled className="container">
            <HeaderApp />
            <Tabs>
                <VerifiedTxFrom label={labelFormVerifiedSentTx}>
                    <VerifySentTx {...{ ...{ handleSubmit, handleVerifierTx } }} />
                </VerifiedTxFrom>
                <VerifiedTxFrom label={labelFormVerifiedReceivedTx}>
                    <VerifyReceivedTx {...{ ...{ handleSubmit, handleVerifierTx } }} />
                </VerifiedTxFrom>
            </Tabs>
        </Styled>
    );
};

export default withVerifierTx(React.memo(VerifierTx));
