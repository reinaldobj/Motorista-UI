import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

import { styles } from '../Shared/Styles';
import ConteudoAlertaWrapper from '../Shared/ConteudoAlerta';

class CustomAlert extends Component {
  displayName = CustomAlert.name;
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.props.fecharAlerta();
  };

  render() {
    const {
      tipo,
      mensagem
    } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={6000}
        open={this.state.open}
        onClose={this.handleClose}
      >
        <ConteudoAlertaWrapper
          onClose={this.handleClose}
          variant={tipo}
          message={mensagem}
        />
      </Snackbar>
    );
  }
}

CustomAlert.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomAlert);
