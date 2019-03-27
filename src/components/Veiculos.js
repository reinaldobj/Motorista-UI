import React, { Component } from 'react';

export class Veiculos extends Component {
	displayName = Veiculos.name

	constructor(props) {
		super(props);
		this.state = null;
		//this.incrementCounter = this.incrementCounter.bind(this);
	}

	incrementCounter() {
		this.setState({
			currentCount: this.state.currentCount + 1
		});
	}

	render() {
		return (
			<div>
				<h1>Veículos</h1>

				<p>TO DO: Implementar Cadastro de Veículos</p>
			</div>
		);
	}
}
