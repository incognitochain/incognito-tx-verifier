import { ISettingLanguage } from 'src/module/Setting';
import { IVerifierTxLanguage } from 'src/module/VerifierTx';

export interface ILanguage {
    general: IGeneralLanguage;
    verifierTx: IVerifierTxLanguage;
    setting: ISettingLanguage;
}

export interface IGeneralLanguage {
    copied: string;
    copy: string;
    seeKey: string;
    lostNetwork: string;
    btnReload: string;
    loadingTx: string;
    btnRetry: string;
    switched: string;
    removed: string;
    keys: string;
    readyDesc: string;
    cameraReadyDesc: string;
    hasCameraDesc: string;
    scanQrCode: string;
    placeQrCode: string;
    success: string;
    masterKey: string;
    masterLess: string;
    keychainName: string;
    masterKeyName: string;
    privateKey: string;
    phrase: string;
}
