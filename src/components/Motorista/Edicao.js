import React, { Component } from 'react';
import axios from "axios";
import u from 'updeep';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import FormLabel from '@material-ui/core/FormLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import { withStyles } from '@material-ui/core/styles';
import { styles } from '../Shared/Styles';

import CEPMask from '../Shared/CEPMask';
import CustomInput from '../Shared/CustomInput';
import CustomDropdown from '../Shared/CustomDropdown';
import CustomAlert from '../Shared/CustomAlert';
import NumericInput from '../Shared/NumericInput';

class Edicao extends Component {
  displayName = Edicao.name;

  constructor(props) {
    super(props);

    this.state = {
      motorista: {
        endereco: {},
        erros: {
          endereco: {}
        }
      },
      mensagem: "",
      erro: false,
      carros: [],
      loading: true,
      idMotorista: this.props.location.state.idMotorista
    };
  }

  componentDidMount() {
    this.getMotorista();
    this.getCarros();
  }

  getMotorista = () => {
    const { idMotorista } = this.state;

    if (idMotorista) {
      axios
        .get(`/api/motorista/${idMotorista}`)
        .then(response => {
          const { motorista } = this.state;
          let newMotorista = u(response.data, motorista);

          this.setState({
            motorista: newMotorista,
            loading: false
          });
        }).catch(error => {
          this.handleError(error);
        });
    }
    else {
      this.setState({
        loading: false
      });
    }
  }

  getCarros = () => {
    axios
      .get('api/carro/ListarDropDown')
      .then(response => {
        this.setState({
          carros: response.data
        });
      })
      .catch(error => {
        this.handleError(error);
      });
  }

  limparMensagens = () => {
    this.setState({
      mensagem: "",
      erro: false
    });
  }

  handleSubmit = () => {
    const { motorista } = this.state;
    if (motorista.id) {
      axios
        .put('/api/Motorista', motorista)
        .then(response => {
          this.setState({ mensagem: "Motorista atualizado com sucesso" });
        })
        .catch(error => {
          this.handleError(error);
        });
    }
    else {
      axios
        .post('/api/Motorista', motorista)
        .then(response => {
          this.setState({ mensagem: "Motorista cadastrado com sucesso" });
        })
        .catch(error => {
          this.handleError(error);
        });
    }
  }

  handleError = (error) => {
    if (typeof String(error.response.data) === 'string') {
      let { motorista } = this.state;
      const mensagemErro = [];

      for (const property in error.response.data) {
        if (error.response.data.hasOwnProperty(property)) {
          mensagemErro.push(`${error.response.data[property][0]}\n`);

          motorista = u.updateIn(`erros.${property.toLowerCase()}`, error.response.data[property][0], motorista);
        }
      }

      this.setState({
        motorista: motorista
      });
    }
    else {
      this.setState({
        mensagem: error.message,
        erro: true
      });
    }
  }

  handleCancel = (e) => {
    this.props.history.goBack();
  }

  handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    const { motorista } = this.state;
    let newMotorista = u.updateIn(name, value, motorista);
    newMotorista = u.updateIn(`erros.${name}`, '', newMotorista);

    this.setState({ motorista: newMotorista });
  }

  renderLoading(classes) {
    return (
      <div>
        <CircularProgress className={classes.progress} />
        <FormLabel component="legend">Carregando...</FormLabel>
      </div>
    );
  }

  renderMotorista = (classes) => {
    const { motorista, mensagem, erro, carros, loading } = this.state;
    const titulo = motorista.id ? 'Edição de Motorista' : 'Novo Motorista';

    return (
      <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        {
          mensagem &&
          <CustomAlert
            fecharAlerta={() => this.limparMensagens()}
            mensagem={mensagem}
            tipo={erro ? "error" : "success"}
          />
        }

        <Typography variant="title" gutterBottom align="left">
          {titulo}
        </Typography>
        <Grid container className={classes.root} spacing={24}>
          <CustomInput
            colControl="4"
            name="nome"
            label="Nome"
            value={motorista.nome}
            handleInputChange={this.handleInputChange}
            fullWidth
            helperText={motorista.erros.nome}
            error={Boolean(motorista.erros.nome)}
          />
          <CustomInput
            colControl="4"
            fullWidth
            name="ultimoNome"
            label="Sobrenome"
            value={motorista.ultimoNome}
            handleInputChange={this.handleInputChange}
            placeholder="Sobrenome..."
            helperText={motorista.erros.ultimonome}
            error={Boolean(motorista.erros.ultimonome)}
          />
        </Grid>
        <Grid container className={classes.root} spacing={24}>
          <CustomInput
            fullWidth
            name="endereco.rua"
            label="Rua" value={motorista.endereco.rua}
            handleInputChange={this.handleInputChange}
            helperText={motorista.erros.endereco.rua}
            error={Boolean(motorista.erros.endereco.rua)}
            colControl="3"
          />
          <NumericInput
            fullWidth
            name="endereco.numero"
            label="Número"
            value={motorista.endereco.numero}
            handleInputChange={this.handleInputChange}
            helperText={motorista.erros.endereco.numero}
            error={Boolean(motorista.erros.endereco.numero)}
            colControl="1"
            type='number'
            min="1"
          />
          <CustomInput
            fullWidth
            name="endereco.complemento"
            label="Compl."
            value={motorista.endereco.complemento}
            handleInputChange={this.handleInputChange}
            helperText={motorista.erros.endereco.complemento}
            error={Boolean(motorista.erros.endereco.complemento)}
            colControl="1"
          />
        </Grid>
        <Grid container className={classes.root} spacing={24}>
          <CustomInput
            fullWidth
            name="endereco.cep"
            label="CEP"
            value={motorista.endereco.cep}
            handleInputChange={this.handleInputChange}
            helperText={motorista.erros.endereco.cep}
            error={Boolean(motorista.erros.endereco.cep)}
            colControl="2"
            inputMask={CEPMask}
          />
          <CustomInput
            fullWidth
            name="endereco.cidade"
            label="Cidade"
            value={motorista.endereco.cidade}
            handleInputChange={this.handleInputChange}
            helperText={motorista.erros.endereco.cidade}
            error={Boolean(motorista.erros.endereco.cidade)}
            colControl="2"
          />
          <CustomInput
            fullWidth
            name="endereco.uf"
            label="Estado"
            value={motorista.endereco.uf}
            handleInputChange={this.handleInputChange}
            helperText={motorista.erros.endereco.uf}
            error={Boolean(motorista.erros.endereco.uf)}
            maxLength="2"
            colControl="1"
          />
        </Grid>
        <Grid container className={classes.root} spacing={8}>
          <CustomDropdown
            name="idCarro"
            label="Carro"
            handleInputChange={(e) => this.handleInputChange(e)}
            registros={carros}
            loading={loading}
            selected={motorista.idCarro}
            colLabel="2"
            colControl="3"
            getRegistros={() => this.getCarros()}
          />
        </Grid>
        <Grid container className={classes.root} spacing={8}>
          <Grid item xs={12}>
            <Tooltip title="Salvar">
              <Button
                mini
                variant="fab"
                color="primary"
                aria-label="Salvar"
                className={classes.button}
                disabled={loading}
                onClick={() => this.handleSubmit()}
              >
                <DoneIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Cancelar">
              <Button
                mini
                variant="fab"
                color="default"
                aria-label="Cancelar"
                disabled={loading}
                className={classes.button}
                onClick={() => this.handleCancel()}
              >
                <ClearIcon />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </form>
    );
  }

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const contents = loading ? this.renderLoading(classes) : this.renderMotorista(classes);

    return (
      <div>
        {contents}
      </div>
    );
  }
}

export default withStyles(styles)(Edicao);
