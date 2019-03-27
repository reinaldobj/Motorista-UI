import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Shared/Styles';

class CustomDropdown extends Component {
  displayName = CustomDropdown.name;

  componentDidMount() {
    this.props.getRegistros();
  }

  renderDropdown() {
    const {
      label,
      name,
      selected,
      handleInputChange,
      registros,
      classes
    } = this.props;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-simple">{label}</InputLabel>
        <Select
          name={name}
          value={selected || 0}
          onChange={(e) => handleInputChange(e)}
        >
          <MenuItem value="0">
            <em>Selecione...</em>
          </MenuItem>
          {
            registros.map(registro =>
              <MenuItem key={registro.valor} value={registro.valor}>{`${registro.descricao}`}</MenuItem>
            )
          }
        </Select>
      </FormControl>
    );
  }

  render() {
    const {
      loading
    } = this.props;
    const contents = loading
      ? null
      : this.renderDropdown();

    return (
      <div>
        {contents}
      </div>
    );
  }
}

export default withStyles(styles)(CustomDropdown);
