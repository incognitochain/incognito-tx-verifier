import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button } from 'src/components/Core';
import { InputField, validator } from 'src/components/ReduxForm';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Setting';
import { HeaderApp } from 'src/components/Header';
import { FORM_CONFIGS } from './VerifierTx.constant';
import withVerifierTx, { IMergeProps } from './VerifierTx.enhance';
import { IVerifierTxLanguage } from './VerifierTx.interface';

const Styled = styled.div`
    &.container {
    }
`;

const VerifierTx = (props: IMergeProps) => {
    const { handleSubmit, handleVerifierTx, submitting, invalid } = props;
    const disabledForm = submitting || invalid;
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { txId, senderSeal, receiverAddress, btnSubmit } = translate;
    return (
        <Styled>
            <HeaderApp />
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
                    name={FORM_CONFIGS.fieldReceiverAddress}
                    validate={[validator.required]}
                    componentProps={{
                        placeholder: receiverAddress.placeholder,
                    }}
                />
                <Button title={`${btnSubmit}${submitting ? '...' : ''}`} disabled={disabledForm} type="submit" />
            </form>
        </Styled>
    );
};

export default withVerifierTx(React.memo(VerifierTx));
