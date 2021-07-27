import React from 'react';
import styled from 'styled-components';
import { AppIcon, SettingIcon } from 'src/components/Icons';

interface IProps {}

const Styled = styled.div`
    &.header {
        margin-bottom: 30px;
    }
`;

const Header = (props: IProps & any) => {
    return (
        <Styled className="header flex-jcb">
            <SettingIcon />
            <AppIcon />
        </Styled>
    );
};

export default Header;
