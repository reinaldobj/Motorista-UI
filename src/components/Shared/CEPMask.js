import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';
import PropTypes from 'prop-types';
import { styles } from '../Shared/Styles';

const CEPMask = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

CEPMask.propTypes = {
  inputRef: PropTypes.func.isRequired
};

export default withStyles(styles)(CEPMask);
