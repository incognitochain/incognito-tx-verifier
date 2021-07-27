import { HTMLAttributes } from 'react';

export interface IProps {}

export interface IVerifierTxReducer {}

export interface IVerifierTxLanguage {
    txId: {
        title: string;
        placeholder: string;
    };
    senderSeal: {
        title: string;
        placeholder: string;
    };
    paymentAddress: {
        title: string;
        placeholder: string;
    };
    otaKey: {
        title: string;
        placeholder: string;
    };
    btnSubmit: string;
    labelFormVerifiedSentTx: string;
    labelFormVerifiedReceivedTx: string;
}

export interface IVerifierForm {
    handleSubmit: (props: any) => any;
    handleVerifierTx: (props: any) => any;
}
