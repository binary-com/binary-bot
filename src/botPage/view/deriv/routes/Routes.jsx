import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from '../layout/Main';
import Endpoint from '../layout/Endpoint';
import NotFound from '../layout/NotFound';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const Routes = () => <BrowserRouter>
  <Header />
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/endpoint" component={Endpoint} />
    <Redirect from="/endpoint.html" to="/endpoint" />
    <Route path="*" component={NotFound} />
  </Switch>
  <Footer />
</BrowserRouter>
export default Routes;