import React from 'react';
import './reset.scss';
import { GlobalStyled } from 'src/styles';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory, createMemoryHistory } from 'history';
import { Router } from 'react-router';
import MainRoute from 'src/module/MainRoute';
import { themeSelector } from './module/Setting';
import withApp from './App.enhance';
import { isDev } from './configs';

const history = isDev ? createBrowserHistory() : createMemoryHistory(); // Instead of createBrowserHistory();

const App: React.FunctionComponent = () => {
    const theme = useSelector(themeSelector);
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyled />
            <Router history={history}>
                <MainRoute />
            </Router>
        </ThemeProvider>
    );
};

export default withApp(React.memo(App));
