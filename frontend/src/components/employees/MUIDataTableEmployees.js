import React, { useEffect, useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { useDispatch, useSelector } from 'react-redux';
import { OpenModal, employeesStartLoading, employeesStartUpdate, employeeSetActive } from '../../actions/employees';
import { Spinner } from '../spinners/Spinner';
import Swal from 'sweetalert2';
import CustomToolbar from '../ui/CustomToolbar';
import { formatDate, getTimePassed } from '../../helpers/formatDate';

export const MUIDataTableEmployees = () => {
	const columns = [
		{
			label: 'Employee ID',
			name: 'employee_id',
			options: {
			customBodyRender: (value) => (
				<div className="centered-cell">{value}</div>
			)
			},
		},
		{
			label: 'First Name',
			name: 'first_name'
		},
		{
			label: 'Last Name',
			name: 'last_name'
		},
		{
			label: 'Hire Date',
			name: 'hire_date',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex, rowIndex) => {
					const hireDat = formatDate(data[dataIndex]['hire_date']);
					const timePassed = getTimePassed(new Date(hireDat));
					
					return (
						<>
							<p>
								{hireDat}
							</p>
							<p>
								{timePassed}
							</p>
						</>
						
					);
				}
			}
		},
		{
			label: 'Department Name',
			name: 'department_name'
		},
		{
			label: 'Phone',
			name: 'phone',
			type: 'numeric'
		},
		{
			label: 'Address',
			name: 'address'
		},
		{
			label: 'Status',
			name: 'is_active',
			options: {
				filter: true,
				sort: true,
				empty: true,
				customBodyRenderLite: (dataIndex) => {
					let claseButton = 'btn btn-sm btn-success';
					let claseIcon = 'fas fa-toggle-on';

					if (data[dataIndex]['is_active'] !== 'Active') {
						claseButton = 'btn btn-sm btn-secondary';
						claseIcon = 'fas fa-toggle-off';
					}

					return (
						<button
							className={claseButton}
							onClick={() => {
								handleChangeStatus(data[dataIndex]);
							}}
						>
							<i className={claseIcon} />
						</button>
					);
				}
			}
		},
		{
			name: 'Update',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex, rowIndex) => {
					return (
						<button
							className="btn btn-sm btn-primary"
							onClick={() => onSelectEdit(data[dataIndex])
							// window.alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)
							}
						>
							<i className="fas fa-edit" />
						</button>
					);
				}
			}
		}
	];

	const options = {
		filterType: 'checkbox',
		filter: true,
		responsive: 'vertical',
		//responsive: standard | vertical | simple
		rowsPerPage: 5,
		rowsPerPageOptions: [ 5, 10, 15, 100 ],
		selectableRows: 'none',
		customToolbar: () => {
			return <CustomToolbar />;
		}
	};

	const dispatch = useDispatch();
	const { employeesTable, loadingEmployees } = useSelector((state) => state.employees);
	const [ data, setData ] = useState([]);
	useEffect(
		() => {
			// dispatch the employees whenever the employeeTable component is rendered and when the dispatch is fired
			// dispatch the action to get the db employees
			dispatch(employeesStartLoading());
		},
		[ dispatch ]
	);

	useEffect(
		() => {
			setData(employeesTable);
		},
		[ loadingEmployees, employeesTable ]
	);

	const handleChangeStatus = (employee) => {
		Swal.fire({
			title: 'Do you want to change the Status?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Change`,
			denyButtonText: `Not Change`,
			cancelButtonText: `Cancel`
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				if (employee['is_active'] === 'Active') {
					employee['is_active'] = 'Inactive';
				} else {
					employee['is_active'] = 'Active';
				}
				// despacho la acción que actualiza al usuario en la bd y el state de redux
				dispatch(employeesStartUpdate(employee));
			} else if (result.isDenied) {
				Swal.fire('Action has been canceled', '', 'info');
			}
		});
	};

	const onSelectEdit = (user) => {
		dispatch(employeeSetActive(user));
		dispatch(OpenModal());
	};

	return (
		<div className="col-md-12">
			{!loadingEmployees ? (
				<MUIDataTable title={'Employees Table'} data={data} columns={columns} options={options} />
			) : (
				<Spinner />
			)}
		</div>
	);
};
