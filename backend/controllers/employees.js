const { response } = require('express');
const Employees = require('../models/Employees');
const DepartmentsHistory = require('../models/DepartmentsHistory');

const CreateEmployee = async (req, res = response) => {

	try {
		Employees.create(req.body, (err, employee) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					msg: err.message || 'Something happened while creating the employee.'
				});
			} else {
				res.json({
					ok: true,
					uid: employee.employee_id,
					name: employee.first_name,
					employee
				});
				
			}
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact to the administrator'
		});
	}
};

// get the employees from the employees table
const GetAllEmployees = async (req, res = response) => {
	Employees.find((err, employees) => {
		if (err)
			return res.status(500).json({
				ok: false,
				msg: err.message || 'Please contact to the administrator'
			});
		else {
			res.json({
				ok: true,
				employees
			});
		}
	});
};

// get the user from the employee table by Id
const GetEmployeeById = async (req, res = response) => {
	const employeeId = req.params.id;
	console.log(employeeId);

	Employees.findById(employeeId, (err, findEmployee, findDepartmentistory) => {
		if (err) {
			// query worked, but there's no employee with that id
			if (err.kind === 'not_found') {
				return res.status(404).json({
					ok: false,
					msg: `Employee does not exist for id ${employeeId}`
				});
			} else {
				// error occurred when trying to execute the query
				return res.status(500).json({
					ok: false,
					msg: `Error when trying to get the employee with id ${employeeId}`
				});
			}
		} else {
			return res.json({
				ok: true,
				employee: findEmployee,
				department_history: findDepartmentistory
			});
		}
	});
};

// UpdateEmployee
const UpdateEmployee = async (req, res = response) => {
    const employeeId = req.params.id;

    try {
        Employees.findById(employeeId, (err, employee, findDepartmentistory) => {
            if (err) {
                if (err.kind === 'not_found') {
                    return res.status(404).json({
                        ok: false,
                        msg: `Employee does not exist for id ${employeeId}`
                    });
                } else {
                    return res.status(500).json({
                        ok: false,
                        msg: `Error when trying to get the employee with id ${employeeId}`
                    });
                }
            } else {
                const previousDepartmentId = employee.department_id;
                let updatedEmployeeData = {
                    ...req.body
                };

                Employees.updateById(employeeId, updatedEmployeeData, (err, updatedEmployee) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: `Error when trying to update the employee with id ${employeeId}`
                        });
                    } else {
                        // Check if department_id has changed
                        if (previousDepartmentId !== updatedEmployee.department_id) {
                            const departmentHistoryData = {
                                employee_id: employeeId,
                                department_id: updatedEmployee.department_id,
                                change_date: new Date()
                            };
							console.log({departmentHistoryData})
                            DepartmentsHistory.create(departmentHistoryData, (err, createdHistory) => {
                                if (err) {
                                    return res.status(500).json({
                                        ok: false,
                                        msg: err.message || 'Something happened while creating the department history.'
                                    });
                                } else {

									Employees.findById(employeeId, (err, updatedEmployee, findDepartmentistory) => {
										return res.json({
											ok: true,
											employee: updatedEmployee,
											department_history: findDepartmentistory
										});
									})
                                }
                            });
                        } else {
                            return res.json({
                                ok: true,
                                employee: updatedEmployee,
								department_history: findDepartmentistory
                            });
                        }
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
};





// DeleteEmployee
const DeleteEmployee = async (req, res = response) => {
    const employeeId = req.params.id;

    try {
        Employees.findById(employeeId, (err, employee) => {
            if (err) {
                if (err.kind === 'not_found') {
                    return res.status(404).json({
                        ok: false,
                        msg: `Employee does not exist for id ${employeeId}`
                    });
                } else {
                    return res.status(500).json({
                        ok: false,
                        msg: `Error when trying to get the employee with id ${employeeId}`
                    });
                }
            } else {
                Employees.deleteById(employeeId, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            msg: `Error when trying to delete the employee with id ${employeeId}`
                        });
                    } else {
                        return res.json({
                            ok: true,
                            msg: `Employee with id ${employeeId} was deleted successfully`
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please contact the administrator'
        });
    }
};



module.exports = {
	CreateEmployee,
	GetAllEmployees,
	GetEmployeeById,
	UpdateEmployee,
	DeleteEmployee,
};
