import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<Link className="navbar-brand" to="/">
				Auth-Demo Assestment
			</Link>

			<div className="navbar-collapse">
				<div className="navbar-nav">
					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/home">
						Home
					</NavLink>

					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/employees">
						Employees
					</NavLink>
				</div>
			</div>
		</nav>
	);
};
