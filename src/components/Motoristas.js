import React, { Component } from 'react';
import axios from "axios";
import { ListaMotoristas } from './ListaMotorista'
import { FormControl, Col, Row, Button } from 'react-bootstrap';

export class Motoristas extends Component {
  displayName = Motoristas.name

  constructor(props) {
	super(props);

	this.handleChange = this.handleChange.bind(this);

	this.state = { nome: "", loading: true };
  }

  handleChange(e) {
	this.setState({ nome: e.target.value });
  }

  render() {
	return (
	  <div>
		<h1>Motoristas</h1>
		<Row>
		  <Col md={6}>
			<FormControl bsSize="sm" placeholder="Nome do Motorista" onChange={this.handleChange} />
		  </Col>
		  <Col md={3}>
			<Button bsStyle="primary">Pesquisar</Button>
		  </Col>
		</Row>
		<ListaMotoristas nomeMotoristaFiltro={this.state.nome} />
	  </div>
	);
  }
}
