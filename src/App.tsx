import React from 'react';
import './reset.scss';
import { GlobalStyled, IGlobalStyle, ITheme } from 'src/styles';
import { useSelector } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import MainRoute from 'src/module/MainRoute';
import { themeSelector } from './module/Setting';
import withApp from './App.enhance';
import Tooltip, { TooltipContainer } from './module/Tooltip';

const history = createBrowserHistory(); // Instead of createBrowserHistory();

const Styled = styled.div`
    &.app-container {
        min-width: ${(props: IGlobalStyle) => props.theme.minWidth};
        max-width: ${(props: IGlobalStyle) => props.theme.maxWidth};
        width: ${(props: IGlobalStyle) => props.theme.width};
        padding: 20px;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        border-radius: 20px;
        border: solid 1px ${(props: { theme: ITheme }) => props.theme.inputBorder};
        min-height: 600px;
    }
`;

const App: React.FunctionComponent = () => {
    const theme = useSelector(themeSelector);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyled />
            <Styled theme={theme} className="app-container">
                <Router history={history}>
                    <MainRoute />
                </Router>
            </Styled>
            <TooltipContainer />
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
