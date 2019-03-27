import React, { Component } from 'react';
import ListaMotoristas from './ListaMotorista';
import axios from "axios";
import CustomAlert from '../Shared/CustomAlert';
import CustomDialog from '../Shared/CustomDialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import { styles } from '../Shared/Styles';

class Motoristas extends Component {
  displayName = Motoristas.name;

  constructor(props) {
    super(props);

    this.state = {
      nomeFiltro: "",
      motoristas: [],
      motoristaExclusao: null,
      loading: true,
      mensagem: "",
      erro: false
    };
  }

  carregarMotoristas(nome) {
    this.setState({
      loading: true
    });
    axios
      .get('/api/motorista/Listar', {
        params: {
          nome: nome
        }
      })
      .then(response => {
        this.setState({
          motoristas: response.data, loading: false
        });
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  handleRedirectEdicao = (id) => {
    this.props.history.push({
      pathname: '/motoristaEdicao',
      state: { idMotorista: id }
    });
  }

  handleClickDelete = (e, id) => {
    e.stopPropagation();

    var motorista = this.state.motoristas.find(m => m.id === id);
    this.setState({
      motoristaExclusao: motorista
    });
  }

  limparDialog = () => {
    this.setState({
      motoristaExclusao: null
    });
  }

  limparDialog = () => {
    this.setState({
      motoristaExclusao: null
    });
  }


  limparMensagens = () => {
    this.setState({
      mensagem: "",
      erro: false
    });
  }

  handleDelete = (id) => {
    axios
      .delete(`/api/motorista/${id}`)
      .then(response => {
        this.setState({
          mensagem: "Motorista excluído com sucesso."
        });
        this.carregarMotoristas();
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleError = (error) => {
    this.setState({
      mensagem: error.toString(),
      erro: true
    });
  }

  render() {
    const { classes } = this.props;
    const { mensagem, erro } = this.state;

    return (
      <div>
        <Typography variant="title" gutterBottom align="left">
          Motoristas
				</Typography>

        {
          mensagem &&
          <CustomAlert
            fecharAlerta={() => this.limparMensagens()}
            mensagem={mensagem}
            tipo={erro ? "error" : "success"}
          />
        }

        {
          this.state.motoristaExclusao &&
          <CustomDialog
            titulo={`Deseja excluir o motorista ${this.state.motoristaExclusao.nomeCompleto}`}
            idRegistro={this.state.motoristaExclusao.id}
            handleClickSim={(id) => this.handleDelete(this.state.motoristaExclusao.id)}
            handleFecharDialog={() => this.limparDialog()}
          />
        }
        <Grid container spacing={8}>
          <Grid item md={6}>
            <TextField
              id="nomeFiltro"
              name="nomeFiltro"
              label="Nome Motorista"
              className={classes.textField}
              value={this.state.nomeFiltro}
              onChange={(e) => this.handleInputChange(e)}
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <Tooltip title="Pesquisar">
              <Button
                mini
                variant="fab"
                color="primary"
                aria-label="Add"
                className={classes.button}
                disabled={this.state.loading}
                onClick={() => this.carregarMotoristas(this.state.nomeFiltro)}
              >
                <SearchIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Novo">
              <Button
                mini
                variant="fab"
                color="default"
                aria-label="Add"
                disabled={this.state.loading}
                className={classes.button}
                onClick={(id) => this.handleRedirectEdicao()}
              >
                <AddIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <ListaMotoristas
          motoristas={this.state.motoristas}
          loading={this.state.loading}
          carregarMotoristas={(nome) => this.carregarMotoristas(nome)}
          handleRedirectEdicao={(id) => this.handleRedirectEdicao(id)}
          handleDelete={(e, id) => this.handleClickDelete(e, id)}
        />
      </div >
    );
  }
}

Motoristas.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Motoristas);
