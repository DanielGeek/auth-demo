import Swal from 'sweetalert2';

// get the correct error message when trying to register
export const employeeAlert = (body) => {
	const { user_email, user_password, user_name } = body.errors;

	if (body.errors.hasOwnProperty('user_name')) {
		return Swal.fire('Error', user_name.msg, 'error');
	}
	if (body.errors.hasOwnProperty('user_email')) {
		return Swal.fire('Error', user_email.msg, 'error');
	}
	if (body.errors.hasOwnProperty('user_password')) {
		return Swal.fire('Error', user_password.msg, 'error');
	}
};
