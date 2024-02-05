import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { departmentsStartLoading } from '../../actions/departments';

export const Departments = ({ handleInputChange, department_id }) => {

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(departmentsStartLoading());
		},
		[ dispatch ]
	);

	const { departments } = useSelector((state) => state.departments);

	return (
		<div className="form-group">
			<label htmlFor="department">Select department</label>
			<select name="department_id" id="department_id" className="form-control" value={department_id} onChange={handleInputChange}>
				{
				departments.map((department_mapeado) => (
					<option key={department_mapeado.department_id} value={department_mapeado.department_id}>
						{department_mapeado.department_name}
					</option>
				))}
			</select>
		</div>
	);
};
