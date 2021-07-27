import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Setting';
import Header from 'src/components/Header';
import { useHistory } from 'react-router-dom';
import { ISettingLanguage } from './Setting.interface';
import { actionToggleDarkMode } from './Setting.actions';
import { ISettingItem } from './features/SettingItem';
import { settingSelector } from './Setting.selector';

interface IProps {}
interface TInner {
    settingFactories: any[];
}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const translate: ISettingLanguage = useSelector(translateByFieldSelector)('setting');
    const dispatch = useDispatch();
    const history = useHistory();
    const { darkMode } = useSelector(settingSelector);
    let settingFactories: ISettingItem[] = [
        {
            title: translate.darkMode.title,
            child: [
                {
                    desc: translate.darkMode.desc,
                    toggle: true,
                    onClick: () => dispatch(actionToggleDarkMode(!darkMode)),
                    toggleValue: darkMode,
                },
            ],
        },
    ];
    return (
        <ErrorBoundary>
            <Header title={translate.headerTitle} onGoBack={() => history.push('/')} />
            <WrappedComponent {...{ ...props, settingFactories }} />
        </ErrorBoundary>
    );
};

export default enhance;
