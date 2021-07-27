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
    receiverAddress: {
        title: string;
        placeholder: string;
    };
    btnSubmit: string;
}
