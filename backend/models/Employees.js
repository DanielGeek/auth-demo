const { dbConnection } = require('../database/config');
const DepartmentsHistory = require('./DepartmentsHistory');

class Employees {
	// constructor
	constructor(employee) {
		this.employee_id = employee.employee_id;
		this.first_name = employee.first_name;
		this.last_name = employee.last_name;
		this.hire_date = employee.hire_date;
		this.department_id = employee.department_id;
		this.phone = employee.phone;
		this.address = employee.address;
		this.is_active = employee.is_active;
	}

	// Update employee by id
	static updateById = (id, employee, result) => {
		dbConnection().query(
		'UPDATE employee SET first_name = ?, last_name = ?, hire_date = ?, department_id = ?, phone = ?, address = ?, is_active = ? WHERE employee_id = ?',
		[
			employee.first_name,
			employee.last_name,
			employee.hire_date,
			employee.department_id,
			employee.phone,
			employee.address,
			employee.is_active,
			id
		],
		(err, res) => {
			if (err) {
			console.log('error: ', err);
			result(null, err);
			return;
			}
	
			if (res.affectedRows === 0) {
			// not found employee with the id
			result({ kind: 'not_found' }, null);
			return;
			}
	
			// Get the updated employee with department_name
			Employees.findById(id, (err, updatedEmployee) => {
			if (err) {
				result(err, null);
				return;
			}
	
			console.log('Updated employee: ', updatedEmployee);
			result(null, updatedEmployee);
			});
		}
		);
	};

	// Get employee by id
	static findById = (employee_id, result) => {
		dbConnection().query(
			`SELECT employee.*, department.department_name
			FROM employee
			LEFT JOIN department ON employee.department_id = department.department_id
			WHERE employee_id = ${employee_id} AND is_deleted = 0`,
			(err, res) => {
				if (err) {
					console.log('error: ', err);
					result(err, null);
					return;
				}

				if (res.length) {
					const employee = res[0];
					DepartmentsHistory.findByEmployeeId(employee_id, (err, departmentHistory) => {
						if (err) {
							console.log('error: ', err);
							result(err, null);
							return;
						}

						console.log('Found employee by id: ', employee);
						result(null, employee, departmentHistory);
					});
					return;
				}

				// not found employee with the id
				result({ kind: 'not_found' }, null);
			}
		);
	};

	// Get all employees
	static find = (result) => {
		dbConnection().query(
			'SELECT employee.*, department.department_name ' +
			'FROM employee ' +
			'LEFT JOIN department ON employee.department_id = department.department_id ' +
			'WHERE is_deleted = 0 ' +
			'ORDER BY last_name',
			(err, res) => {
				if (err) {
					console.log('error: ', err);
					result(null, err);
					return;
				}

				console.log('Employees: ', res);
				result(null, res);
			}
		);
	};

	// Create an employee
	static create(newEmployee, result) {
		dbConnection().query('INSERT INTO employee SET ?', newEmployee, (err, res) => {
			if (err) {
				console.log('error: ', err);
				result(err, null);
				return;
			}

			console.log('created Employee: ', { employee_id: res.insertId, ...newEmployee });
			result(null, { employee_id: res.insertId, ...newEmployee });
		});
	}

	// Mark an employee as deleted
	static deleteById = (id, result) => {
		dbConnection().query(
			'UPDATE employee SET is_deleted = 1 WHERE employee_id = ?',
			id,
			(err, res) => {
				if (err) {
					console.log('error: ', err);
					result(null, err);
					return;
				}

				if (res.affectedRows == 0) {
					// not found employee with the id
					result({ kind: 'not_found' }, null);
					return;
				}

				console.log('Deleted employee: ', { id: id });
				result(null, res);
			}
		);
	};

}

module.exports = Employees;
