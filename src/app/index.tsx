/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

import { Stage } from './components/game/stage';
import { RootStore } from './redux/store';
import { DataService } from './service/data-service';
export const store = new RootStore().getStore();
export function App() {

  DataService.getData();
  return (
    <BrowserRouter>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={Stage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
