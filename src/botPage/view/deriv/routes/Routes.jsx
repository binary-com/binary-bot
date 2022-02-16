import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Main from '../layout/Main';
const Routes = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" element={<Main />} />
  </Switch>
</BrowserRouter>
export default Routes;