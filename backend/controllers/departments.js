const { response } = require('express');
const Departments = require('../models/Departments');

// get the departments from the department table
const GetAllDepartments = async (req, res = response) => {
	Departments.find((err, departments) => {
		if (err)
			return res.status(500).json({
				ok: false,
				msg: err.message || 'Please contact to the administrator'
			});
		else {
			res.json({
				ok: true,
				departments
			});
		}
	});
};

module.exports = {
	GetAllDepartments,
};
