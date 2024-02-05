const { response } = require('express');
const DepartmentsHistory = require('../models/DepartmentsHistory');

// get the GetAllDepartmentsHistory from the department_history table
const GetAllDepartmentsHistory = async (req, res = response) => {
	DepartmentsHistory.find((err, departments_history) => {
		if (err)
			return res.status(500).json({
				ok: false,
				msg: err.message || 'Please contact to the administrator'
			});
		else {
			res.json({
				ok: true,
				departments_history
			});
		}
	});
};

const CreateDepartmentHistory = async (req, res = response) => {

	try {
		DepartmentsHistory.create(req.body, (err, department_history) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					msg: err.message || 'Something happened while creating the department_history.'
				});
			} else {
				res.json({
					ok: true,
					uid: department_history.history_id,
					department_history
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

module.exports = {
    CreateDepartmentHistory,
	GetAllDepartmentsHistory,
};
