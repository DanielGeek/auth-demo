import { customFetch } from '../helpers/fetch';
import { formatDate } from '../helpers/formatDate';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { employeeAlert } from '../helpers/alerts';

// get all employees
export const employeesStartLoading = () => {
	return async (dispatch) => {
		try {
			dispatch(loadingEmployees(true));
			const resp = await customFetch('GetAllEmployees');
			const body = await resp.json();
			if (body.ok) {
				const employeesData = body.employees;
				dispatch(employeesLoaded(employeesData));
			} else {
				Swal.fire('Error', body.msg, 'error');
			}

			dispatch(loadingEmployees(false));
		} catch (error) {
			console.log(error);
		}
	};
};

export const loadingEmployees = (loadingEmployees) => ({
	type: types.loadingEmployees,
	payload: loadingEmployees
});

// add to the redux state the employees obtained from the db
const employeesLoaded = (employeesData) => ({
	type: types.employeesLoaded,
	payload: employeesData
});

export const employeeSetActive = (employee) => ({
	type: types.employeeSetActive,
	payload: employee
});

export const employeesClearActive = () => ({ type: types.employeesClearActive });

// update employee
export const employeesStartUpdate = (employee) => {

	employee = {
		...employee,
		hire_date: formatDate(employee.hire_date)
	}

	return async (dispatch) => {
		try {
			const resp = await customFetch(`UpdateEmployee/${employee.employee_id}`, employee, 'PUT');
			const body = await resp.json();

			if (body.ok) {
				// if everything goes well I update the employee in the redux state
				dispatch(employeesUpdated(body.employee));
				Swal.fire('Updated!', `<strong>${employee.first_name}</strong> has been updated`, 'success');
			} else {
				Swal.fire('Error', body.msg, 'error');
			}
		} catch (error) {
			console.log(error);
		}
	};
};

// update the employee in the redux state
const employeesUpdated = (employee) => ({
	type: types.employeesUpdated,
	payload: employee
});

export const startRegister = (
	first_name,
	last_name,
	hire_date,
	department_id,
	phone = '',
	address = '',
	is_active = 'Active',
) => {
	return async (dispatch) => {

		const resp = await customFetch(
			'CreateEmployee',
			{ first_name, last_name, hire_date, department_id, phone, address, is_active },
			'POST'
		);
		const body = await resp.json();

		if (body.ok) {
			Swal.fire(
				'Successful registration',
				'success'
			);

		// assign the redux state to the user
		dispatch(employeeAddNew(body.employee));
			
		} else {
			if (body.errors) {
				employeeAlert(body);
			} else {
				Swal.fire('Error', body.msg, 'error');
			}
		}
	};
};

const employeeAddNew = (userNew) => ({
	type: types.employeeAddNew,
	payload: userNew
});

// return action to open the modal
export const OpenModal = () => ({ type: types.OpenModal });
// return action to close the modal
export const CloseModal = () => ({ type: types.CloseModal });
