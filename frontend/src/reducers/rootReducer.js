import { combineReducers } from 'redux';
import { employeesReducer } from './employeesReducer';
import { departmentsReducer } from './departmentsReducer';

// combina los reducers que seran mostrados en el state de mi store
export const rootReducer = combineReducers({
	employees: employeesReducer,
	departments: departmentsReducer,
});
