import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import { COLORS, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';
import { IPropsTabs } from './Tabs.interface';
import Tab from './Tabs.tab';

const Styled = styled.div`
    &.tabs {
        .tab-list {
            border-radius: 20px;
            padding: 2px;
        }
        .tab-list .tab {
            margin-top: unset;
            flex: 1 0 auto;
            max-width: 48%;
        }
    }
`;

const Tabs = (props: IPropsTabs) => {
    const { children } = props;
    const theme = useSelector(themeSelector);
    const [activeTab, setActiveTab] = React.useState('');
    const onClickTabItem = (tab: string) => setActiveTab(tab);
    React.useEffect(() => {
        if (children) {
            setActiveTab(children[0].props.label || '');
        }
    }, []);
    return (
        <Styled className="tabs" theme={theme}>
            <ol className="tab-list flex-jcb">
                {children.map((child) => {
                    const { label } = child.props;
                    return <Tab activeTab={activeTab} key={label} label={label} onClickTab={onClickTabItem} />;
                })}
            </ol>
            <div className="tab-content">
                {children.map((child) => {
                    if (child.props.label !== activeTab) return undefined;
                    return child.props.children;
                })}
            </div>
        </Styled>
    );
};

export default React.memo(Tabs);
