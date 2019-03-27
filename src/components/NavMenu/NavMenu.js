import React from 'react';
import { Link } from 'react-router-dom';
import { PermIdentity, DirectionsCar, Home } from '@material-ui/icons';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export const navItems = (
	<div>
		<ListItem button component={Link} to="/">
			<ListItemIcon>
				<Home />
			</ListItemIcon>
			<ListItemText primary="Home" />
		</ListItem>
		<ListItem button component={Link} to="/veiculos">
			<ListItemIcon>
				<DirectionsCar />
			</ListItemIcon>
			<ListItemText primary="Carros" />
		</ListItem>
		<ListItem button component={Link} to="/motoristas">
			<ListItemIcon>
				<PermIdentity />
			</ListItemIcon>
			<ListItemText primary="Motoristas" />
		</ListItem>
	</div>
);
