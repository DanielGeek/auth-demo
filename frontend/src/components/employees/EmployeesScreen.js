import React, { Fragment } from 'react';
import { MUIDataTableEmployees } from './MUIDataTableEmployees';
import { EmployeeModal } from './EmployeeModal';

export const EmployeesScreen = () => {
	return (
		<Fragment>
			<br />
			<div className="row">
				<MUIDataTableEmployees />
				<EmployeeModal />
			</div>
		</Fragment>
	);
};
