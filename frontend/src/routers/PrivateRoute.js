import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) => ( <Component {...props} /> )}
		/>
	);
};

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired
};
