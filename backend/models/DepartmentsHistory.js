const { dbConnection } = require('../database/config');

class DepartmentsHistory {
	// constructor
	constructor(department_history) {
		this.history_id = department_history.history_id;
		this.employee_id = department_history.employee_id;
		this.department_id = department_history.department_id;
		this.change_date = department_history.change_date;
	}

	// Get department_history by employee_id
	static findByEmployeeId = (employee_id, result) => {
		dbConnection().query(
			'SELECT department_history.*, department.department_name ' +
			'FROM department_history ' +
			'LEFT JOIN department ON department_history.department_id = department.department_id ' +
			'WHERE department_history.employee_id = ' + employee_id + ' ' +
			'ORDER BY history_id DESC',
			(err, res) => {
				if (err) {
					console.log('error: ', err);
					result(err, null);
					return;
				}

				console.log('Found department_history by employee_id: ', res);
				result(null, res);
				return;
			}
		);
	};

	// GetAllDepartmentsHistory
	static find = (result) => {
		dbConnection().query(
			'SELECT department_history.*, department.department_name, employee.first_name, employee.last_name ' +
			'FROM department_history ' +
			'LEFT JOIN department ON department_history.department_id = department.department_id ' +
			'LEFT JOIN employee ON department_history.employee_id = employee.employee_id ORDER BY department_history.history_id DESC',
			(err, res) => {
			if (err) {
				console.log('error: ', err);
				result(null, err);
				return;
			}

			console.log('DepartmentsHistory: ', res);
			result(null, res);
		});
	};

	// Create a Department History
	static create(DepartmentHistory, result) {
		dbConnection().query('INSERT INTO department_history SET ?', DepartmentHistory, (err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			console.log('created Department History: ', { history_id: res.insertId, ...DepartmentHistory });
			result(null, { history_id: res.insertId, ...DepartmentHistory });
		});
	}
}

module.exports = DepartmentsHistory;
