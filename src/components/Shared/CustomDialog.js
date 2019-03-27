import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Transition from '../Shared/Transition';

class CustomDialog extends React.Component {
  displayName = CustomDialog.name;
  state = {
    open: true
  };

  handleClickSim = () => {
    this.props.handleClickSim(this.props.idRegistro);
    this.props.handleFecharDialog();
  };

  handleClickNao = () => {
    this.props.handleFecharDialog();
  };

  render() {
    const {
      titulo
    } = this.props;

    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {this.props.titulo}
        </DialogTitle>
        <DialogActions>
          <Button onClick={this.handleClickNao} color="primary">
            Não
            </Button>
          <Button onClick={this.handleClickSim} color="primary">
            Sim
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CustomDialog;
