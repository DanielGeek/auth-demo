/*
    department_history Routes
*/

const { Router, response } = require('express');

const { GetAllDepartmentsHistory } = require('../controllers/departments_history');

const router = Router();

// GetAllDepartmentsHistory
router.get('/GetAllDepartmentsHistory', GetAllDepartmentsHistory);

module.exports = router;
