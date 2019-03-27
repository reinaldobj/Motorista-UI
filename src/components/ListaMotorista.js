import React, { Component } from 'react';
import axios from "axios";

export class ListaMotoristas extends Component {
  displayName = ListaMotoristas.name

  constructor(props) {
	super(props);
	this.state = { motoristas: [], loading: true };

	axios
	  .get('/api/motorista/Listar')
	  .then(response => {
		this.setState({
		  motoristas: response.data, loading: false
		});
	  });
  }

  static renderMotoristas(motoristas) {
	return (
	  <table className='table table-striped table-hover'>
		<thead>
		  <tr>
			<th>Nome</th>
			<th>Endereço</th>
			<th>CEP</th>
			<th>Cidade</th>
			<th>Estado</th>
		  </tr>
		</thead>
		<tbody>
		  {motoristas.map(motorista =>
			<tr key={motorista.id}>
			  <td>{`${motorista.nome} ${motorista.ultimoNome}`}</td>
			  <td>{motorista.endereco.rua}</td>
			  <td>{motorista.endereco.cep}</td>
			  <td>{motorista.endereco.cidade}</td>
			  <td>{motorista.endereco.uf}</td>
			</tr>
		  )}
		</tbody>
	  </table>
	);
  }

  render() {
	let contents = this.state.loading
	  ? <p><em>Carregando...</em></p>
	  : ListaMotoristas.renderMotoristas(this.state.motoristas);

	return (
	  <div>
		<p>{this.props.nomeMotoristaFiltro}</p>
		{contents}
	  </div>
	);
  }
}
