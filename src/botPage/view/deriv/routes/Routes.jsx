import React from 'react';
import { BrowserRouter, Routes as Switch, Route, Navigate, useRoutes } from 'react-router-dom';
import Main from '../layout/Main';
import Endpoint from '../layout/Endpoint';
import NotFound from '../layout/NotFound';
const Routes = () => <BrowserRouter>
  <Switch>
    <Route exact path="/" element={<Main />} />
    <Route path="/endpoint" element={<Endpoint />} />
    <Route path="/endpoint.html" element={<Navigate to="/endpoint" />} />
    <Route path="*" element={<NotFound />} />
  </Switch>
</BrowserRouter>
export default Routes;