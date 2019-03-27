import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

export class Home extends Component {
  displayName = Home.name;

  render() {
    return (
      <div>
        <Typography variant="title" gutterBottom align="left">
          Motorista App
				</Typography>
      </div>
    );
  }
}
