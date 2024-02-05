/*
    employees Routes
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const {
	CreateEmployee,
	GetAllEmployees,
	GetEmployeeById,
	UpdateEmployee,
	DeleteEmployee,
} = require('../controllers/employees');

const router = Router();

// create a new employee
router.post(
	'/CreateEmployee',
	[
		// middlewares
		check('first_name', 'Field First name is required').not().isEmpty(),
		check('last_name', 'Field Last name is required').not().isEmpty(),
		check('hire_date', 'Field Hire date is required').not().isEmpty(),
		check('department_id', 'Field Department ID is required').not().isEmpty(),
		check('is_active', 'Field is active is required').not().isEmpty(),
		validateFields
	],
	CreateEmployee
);

// GetAllEmployees
router.get('/GetAllEmployees', GetAllEmployees);

// GetEmployeeById
router.get('/GetEmployeeById/:id', GetEmployeeById);

// Update employee
router.put(
	'/UpdateEmployee/:id',
	[
		check('first_name', 'Field First name is required').not().isEmpty(),
		check('last_name', 'Field Last name is required').not().isEmpty(),
		check('hire_date', 'Field Hire date is required').not().isEmpty(),
		check('department_id', 'Field Department ID is required').not().isEmpty(),
		check('is_active', 'Field is active is required').not().isEmpty(),
		validateFields
	],
	UpdateEmployee
);

// Delete employee
router.put('/DeleteEmployee/:id', DeleteEmployee);

module.exports = router;
