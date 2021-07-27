import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { IPropsTab } from './Tabs.interface';

const Styled = styled.div``;

const Tab = (props: IPropsTab & HTMLAttributes<HTMLDivElement>) => {
    const { activeTab, label, onClickTab } = props;
    const onClick = () => typeof onClickTab === 'function' && onClickTab(label);
    return <Button title={label} onClick={onClick} className="tab" disabled={label !== activeTab} />;
};

export default React.memo(Tab);
