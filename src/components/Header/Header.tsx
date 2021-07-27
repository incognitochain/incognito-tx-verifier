import React from 'react';
import styled from 'styled-components';
import { ArrowLeftIcon, SettingIcon } from 'src/components/Icons';
import { useHistory } from 'react-router-dom';

interface IProps {}

const Styled = styled.div`
    &.header {
        margin-bottom: 30px;
    }
`;

const Header = (props: IProps & any) => {
    const history = useHistory();
    const handleClick = () => {
        history.goBack();
    };
    return (
        <Styled className="header">
            <ArrowLeftIcon onClick={handleClick} />
        </Styled>
    );
};

export default Header;
