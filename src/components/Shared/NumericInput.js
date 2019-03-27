import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Shared/Styles';

const NumericInput = ({ name, label, value, colControl, handleInputChange, classes, helperText, inputMask, ...props }) => {
  return (
    <Grid item md={Number(colControl)}>
      <TextField
        name={name}
        label={label}
        className={classes.textField}
        value={value || ''}
        onChange={(e) => handleInputChange(e)}
        helperText={helperText || ''}
        type="number"
        {...props}
      />
    </Grid>
  );
};

export default withStyles(styles)(NumericInput);
