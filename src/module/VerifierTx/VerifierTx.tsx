import React, { HTMLAttributes } from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import { Button } from 'src/components/Core';
import { InputField, validator } from 'src/components/ReduxForm';
import styled from 'styled-components';
import { themeSelector, translateByFieldSelector } from 'src/module/Setting';
import { HeaderApp } from 'src/components/Header';
import Tabs from 'src/components/Core/Tabs';
import { TrashBinIcon } from 'src/components/Icons';
import { FORM_CONFIGS } from './VerifierTx.constant';
import withVerifierTx, { IMergeProps } from './VerifierTx.enhance';
import { IVerifierTxLanguage } from './VerifierTx.interface';

const Styled = styled.div`
    &.container {
        .btn-container {
            margin-top: 30px;
        }
    }
`;

const VerifySentTx = React.memo(() => {
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { txId, senderSeal, paymentAddress } = translate;
    return (
        <>
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
        </>
    );
});

const VerifyReceivedTx = React.memo(() => {
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { txId, otaKey } = translate;
    return (
        <>
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
        </>
    );
});

const VerifiedTxFrom = React.memo(
    (props: { label: string; tabID: number | string } & HTMLAttributes<HTMLDivElement>) => {
        const { children, ...rest } = props;
        return (
            <div className="form-container" {...rest}>
                {children}
            </div>
        );
    },
);

const VerifierTx = (props: IMergeProps) => {
    const { handleSubmit, handleVerifierTx, handleClearForm, result, submitting, invalid } = props;
    const translate: IVerifierTxLanguage = useSelector(translateByFieldSelector)('verifierTx');
    const { labelFormVerifiedReceivedTx, labelFormVerifiedSentTx, btnSubmit } = translate;
    const disabledForm = submitting || invalid;
    const theme = useSelector(themeSelector);
    return (
        <Styled className="container" theme={theme}>
            <HeaderApp customLeftHeader={<TrashBinIcon onClick={handleClearForm} />} />
            <form onSubmit={handleSubmit(handleVerifierTx)}>
                <Tabs>
                    <VerifiedTxFrom label={labelFormVerifiedSentTx} tabID={0}>
                        <VerifySentTx />
                    </VerifiedTxFrom>
                    <VerifiedTxFrom label={labelFormVerifiedReceivedTx} tabID={1}>
                        <VerifyReceivedTx />
                    </VerifiedTxFrom>
                </Tabs>
                <Button title={`${btnSubmit}${submitting ? '...' : ''}`} disabled={disabledForm} type="submit" />
            </form>
            {result && <p className="fs-regular fw-regular main-text m-t-30">{result}</p>}
        </Styled>
    );
};

export default withVerifierTx(React.memo(VerifierTx));
