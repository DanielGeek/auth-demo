const { dbConnection } = require('../database/config');

class Departments {
	// constructor
	constructor(department) {
		this.department_id = department.department_id;
		this.department_name = department.department_name;
	}

	// GetAllDepartments
	static find = (result) => {
		dbConnection().query('SELECT * FROM department ORDER BY department_name', (err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			console.log('Departments: ', res);
			result(null, res);
		});
	};
}

module.exports = Departments;
