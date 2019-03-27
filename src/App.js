import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import { Home } from './components/Home/Home';
import Motoristas from './components/Motorista/Motoristas';
import { Veiculos } from './components/Veiculos/Veiculos';
import MotoristaEdicao from './components/Motorista/Edicao';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './components/Shared/Styles';
import './App.css';

import { Route } from 'react-router';

class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/veiculos' component={Veiculos} />
        <Route path='/motoristas' component={Motoristas} />
        <Route path='/motoristaEdicao' component={MotoristaEdicao} />
      </Layout>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);

