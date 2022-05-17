import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from "prop-types";
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const RouteWrapper = ({ path, component: component }) => (
  <React.Fragment>
    <Header />
    <Route path={path} component={component} />
    <Footer />
  </React.Fragment>
);

RouteWrapper.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired
}

export default RouteWrapper;
