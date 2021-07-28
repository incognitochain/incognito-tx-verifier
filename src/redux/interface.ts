import { ITabsReducer } from 'src/components/Core/Tabs';
import { ISettingReducer } from 'src/module/Setting';
import { ITooltipReducer } from 'src/module/Tooltip';
import { IVerifierTxReducer } from 'src/module/VerifierTx';

export interface IAction {
    type: string;
    payload: any;
}

export interface IRootState {
    setting: ISettingReducer;
    verifierTx: IVerifierTxReducer;
    tooltip: ITooltipReducer;
    tabs: ITabsReducer;
}
