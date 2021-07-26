import { ISettingReducer } from 'src/module/Setting';

export interface IAction {
    type: string;
    payload: any;
}

export interface IRootState {
    setting: ISettingReducer;
}
