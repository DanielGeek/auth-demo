import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CloseModal, employeesClearActive, employeesStartUpdate, startRegister } from '../../actions/employees';
import { StaticDialog, ModalContent, ModalFooter, ModalButton } from 'react-st-modal';
import { Departments } from '../departments/Departments';
import { formatDate } from '../../helpers/formatDate';

const dateRegex = /^(\d{2})[-/](\d{2})[-/](\d{2})$/;

const initUser = {
	first_name: '',
	last_name: '',
	hire_date: '',
	department_id: '',
	phone: '',
	address: '',
};

const initUserValid = {
	first_nameValid: true,
	last_nameValid: true,
	hire_dateValid: true,
};

export const EmployeeModal = () => {
	const { modalOpen } = useSelector((state) => state.employees);
	const { activeUser } = useSelector((state) => state.employees);
	const dispatch = useDispatch();

	const [ userValid, setUserValid ] = useState(initUserValid);

	const { first_nameValid, last_nameValid, hire_dateValid } = userValid;

	const [ formValues, setFormValues ] = useState(initUser);

	const {
		first_name,
		last_name,
		hire_date,
		department_id,
		phone,
		address
	} = formValues;

	useEffect(
		() => {
			// si no es null el usuario activo asigno los valores al form del usuario seleccionado a editar
			if (activeUser) {
				setFormValues({
					...activeUser,
					last_name: activeUser.last_name ? activeUser.last_name : '',
					hire_date: activeUser.hire_date ? formatDate(activeUser.hire_date) : '',
					phone: activeUser.phone ? activeUser.phone : '',
					department_id: activeUser.department_id ? activeUser.department_id : '',
					address: activeUser.address ? activeUser.address : '',
				});
			} else {
				setFormValues(initUser);
			}
		},
		[ activeUser, setFormValues ]
	);

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value
		});
	};

	const closeModal = () => {
		dispatch(CloseModal());
		dispatch(employeesClearActive());
		setFormValues(initUser);
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();

		if (first_name.trim().length < 2) {
			return setUserValid({
				...initUserValid,
				first_nameValid: false
			});
		}

		if (last_name.trim().length < 2) {
			return setUserValid({
				...initUserValid,
				last_nameValid: false
			});
		}

		if (hire_date.trim() === '') {
			return setUserValid({
				...initUserValid,
				hire_dateValid: false
			});
		}

		if (!formatDate(hire_date.match(dateRegex))) {
			console.log({hire_date})
			return setUserValid({
				...initUserValid,
				hire_dateValid: false
			});
		}

		
		// if the activeUser is active it means that you want to edit the user
		if (activeUser) {
			dispatch(employeesStartUpdate(formValues));
		} else {
			
			// send the data of the form to save it in the db
			dispatch(startRegister(first_name, last_name, hire_date, department_id, phone, address));
		}

		setUserValid(initUserValid);
		closeModal();
	};
	
	return (
		<StaticDialog className="container" isOpen={modalOpen} title="Fill out the form" onAfterClose={closeModal}>
			<ModalContent>
				<h1> {activeUser ? 'Edit Employee' : 'New Employee'} </h1>
				<hr />
				<form onSubmit={handleSubmitForm}>
					<div className="form-group">
						<label htmlFor="first_name">First Name</label>
						<input
							name="first_name"
							type="text"
							className={`form-control ${!first_nameValid ? 'is-invalid' : ''} `}
							placeholder="User name"
							value={first_name}
							onChange={handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="last_name">Last Name</label>
						<input
							name="last_name"
							type="text"
							className={`form-control ${!last_nameValid ? 'is-invalid' : ''} `}
							placeholder="User last name"
							value={last_name}
							onChange={handleInputChange}
						/>
					</div>

					<hr />
					
					<div className="form-group">
						<label htmlFor="hire_date">Hire Date</label>
						<input
							type="date"
							className={`form-control ${!hire_dateValid ? 'is-invalid' : ''} `}
							placeholder="Hire date"
							name="hire_date"
							value={formatDate(hire_date)}
							onChange={handleInputChange}
							lang="en"
						/>
					</div>

					<Departments handleInputChange={handleInputChange} department_id={department_id} />

					<div className="form-group">
						<label htmlFor="phone">Phone</label>
						<input
							type="text"
							className="form-control"
							placeholder="User phone"
							name="phone"
							value={phone}
							onChange={handleInputChange}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="address">Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="User address"
							name="address"
							value={address}
							onChange={handleInputChange}
						/>
					</div>

					<button type="submit" className="btn btn-outline-primary btn-block">
						<i className="far fa-save">
							<span> Save</span>
						</i>
					</button>
				</form>
			</ModalContent>
			<ModalFooter>
				<ModalButton onClick={closeModal}>Cerrar</ModalButton>
			</ModalFooter>
		</StaticDialog>
	);
};
