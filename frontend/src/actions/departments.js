import { customFetch } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

// get all system departments from the departments table
export const departmentsStartLoading = () => {
	return async (dispatch) => {
		try {
			dispatch(loadingDepartments(true));
			const resp = await customFetch('GetAllDepartments');
			const body = await resp.json();
			if (body.ok) {
				const departments = body.departments;
				dispatch(departmentsLoaded(departments));
			} else {
				Swal.fire('Error', body.msg, 'error');
			}

			dispatch(loadingDepartments(false));
		} catch (error) {
			console.log(error);
		}
	};
};

// loading true when fetching the departments
const loadingDepartments = (loadingDepartments) => ({
	type: types.loadingDepartments,
	payload: loadingDepartments
});

// add to the redux state the departments obtained from the db
const departmentsLoaded = (departments) => ({
	type: types.departmentsLoaded,
	payload: departments
});
