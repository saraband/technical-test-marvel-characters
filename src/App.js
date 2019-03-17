/**
 *  Main component, splits the app into routes
 */

import React, { Suspense, lazy } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {Switch, Route, withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import DefaultLayout from '@layouts/Default';
import Routes from '@routes';

// Route-based code-splitting
const CharactersListPage = lazy(() => import(/* webpackChunkName: 'characters-list' */ '@pages/CharactersList/index'));
const CharacterDetailsPage = lazy(() => import(/* webpackChunkName: 'character-details' */ '@pages/CharacterDetails/index'));
const NotFound404 = lazy(() => import(/* webpackChunkName: 'not-found-404' */ '@pages/NotFound404'));

class App extends React.Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Scrolls back to top when the user changes page
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render () {
    return (
      <DefaultLayout>
        <CssBaseline/>
        <Suspense fallback={<FallBack/>}>
          <Switch>
            <Route exact path={Routes.HOME} component={CharactersListPage}/>
            <Route exact path={Routes.CHARACTERS_LIST} component={CharactersListPage}/>
            <Route exact path={Routes.CHARACTER_DETAILS} component={CharacterDetailsPage}/>
            <Route component={NotFound404}/>
          </Switch>
        </Suspense>
      </DefaultLayout>
    );
  }
}

/* STYLES */
const FallBack = styled.div.attrs({
  children: <CircularProgress />
})`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default withRouter(App);