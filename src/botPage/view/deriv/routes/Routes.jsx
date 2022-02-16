import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from 'react-router-dom';
import Main from '../layout/Main';
import Endpoint from '../layout/Endpoint';
const Routes = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" element={<Main />} />
    <Route path="/endpoint" element={<Endpoint />} />
  </Switch>
</BrowserRouter>
export default Routes;