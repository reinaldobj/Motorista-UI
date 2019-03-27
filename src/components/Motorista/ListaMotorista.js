import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHeaderColumn from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { styles } from '../Shared/Styles';

export class ListaMotoristas extends Component {
  displayName = ListaMotoristas.name;

  componentDidMount() {
    this.props.carregarMotoristas();
  }

  handleClick = (id) => {
    this.props.handleRedirectEdicao(id);
  }

  handleDelete = (e, id) => {
    this.props.handleDelete(e, id);
  }

  renderLoading(classes) {
    return (
      <div>
        <CircularProgress className={classes.progress} />
        <FormLabel component="legend">Carregando...</FormLabel>
      </div>
    );
  }

  renderMotoristas(motoristas, classes) {
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn numeric>Endereço</TableHeaderColumn>
              <TableHeaderColumn numeric>CEP</TableHeaderColumn>
              <TableHeaderColumn numeric>Cidade</TableHeaderColumn>
              <TableHeaderColumn numeric>Estado</TableHeaderColumn>
              <TableHeaderColumn numeric style={{ width: "10px", padding: "0px" }} />
              <TableHeaderColumn numeric style={{ width: "10px", padding: "0px" }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {motoristas.map(motorista =>
              <TableRow hover key={motorista.id}>
                <TableCell>{`${motorista.nome} ${motorista.ultimoNome}`}</TableCell>
                <TableCell >{motorista.endereco.rua}</TableCell>
                <TableCell numeric>{motorista.endereco.cep}</TableCell>
                <TableCell>{motorista.endereco.cidade}</TableCell>
                <TableCell>{motorista.endereco.uf}</TableCell>
                <TableCell style={{ width: "10px", padding: "0px" }}>
                  <Tooltip title="Editar">
                    <IconButton
                      onClick={(id) => this.handleClick(motorista.id)}
                      color="primary"
                      variant="fab"
                      aria-label="Editar"
                      className={classes.button}
                      component="span"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell style={{ width: "10px", padding: "0px" }}>
                  <Tooltip title="Excluir">
                    <IconButton
                      onClick={(e, id) => this.handleDelete(e, motorista.id)}
                      variant="fab"
                      color="default"
                      aria-label="Excluir"
                      className={classes.button}
                      component="span"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>

    );
  }

  render() {
    const { classes } = this.props;

    const {
      loading,
      motoristas,
      nomeMotoristaFiltro
    } = this.props;

    const contents = loading
      ? this.renderLoading(classes)
      : this.renderMotoristas(motoristas, classes);

    return (
      <div>
        <p>{nomeMotoristaFiltro}</p>
        {contents}
      </div>
    );
  }
}

ListaMotoristas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ListaMotoristas);
