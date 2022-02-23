import React from 'react';
import { BrowserRouter, Routes as Switch, Route, Navigate } from 'react-router-dom';
import Main from '../layout/Main';
import Endpoint from '../layout/Endpoint';
import NotFound from '../layout/NotFound';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Routes = () => <BrowserRouter>
  <Header />
  <Switch>
    <Route exact path="/" element={<Main />} />
    <Route path="/endpoint" element={<Endpoint />} />
    <Route path="/endpoint.html" element={<Navigate to="/endpoint" />} />
    <Route path="*" element={<NotFound />} />
  </Switch>
  <Footer />
</BrowserRouter>
export default Routes;