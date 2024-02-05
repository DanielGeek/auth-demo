/*
    departments Routes
*/

const { Router, response } = require('express');
const { GetAllDepartments } = require('../controllers/departments');

const router = Router();

// GetAllDepartments
router.get('/GetAllDepartments', GetAllDepartments);

module.exports = router;