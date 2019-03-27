import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export class Veiculos extends Component {
  displayName = Veiculos.name

  constructor(props) {
    super(props);
    this.state = null;
  }

  render() {
    return (
      <div>
        <Typography variant="title" gutterBottom align="left">
          Veículos
				</Typography>
        <Typography variant="subheading" gutterBottom align="left">
          TO DO: Implementar Cadastro de Veículos
				</Typography>
      </div>
    );
  }
}
