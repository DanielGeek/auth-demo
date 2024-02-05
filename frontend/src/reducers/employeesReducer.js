import { types } from '../types/types';

// employees Reducer
const initialState = {
	employeesTable: [],
	activeUser: null,
	loadingEmployees: false,
	modalOpen: false
};

export const employeesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.employeeAddNew:
			return {
				...state,
				employeesTable: [ ...state.employeesTable, action.payload ]
			};
		case types.employeeSetActive:
			return {
				...state,
				activeUser: action.payload
			};
		case types.employeesLoaded:
			return {
				...state,
				employeesTable: [ ...action.payload ]
			};
		case types.loadingEmployees:
			return {
				...state,
				loadingEmployees: action.payload
			};
		case types.employeesClearActive:
			return {
				...state,
				activeUser: null
			};
		case types.employeesUpdated:
			return {
				...state,
				employeesTable: state.employeesTable.map(
					(user) => (user.employee_id === action.payload.employee_id ? action.payload : user)
				)
			};
		case types.OpenModal:
			return {
				...state,
				modalOpen: true
			};
		case types.CloseModal:
			return {
				...state,
				modalOpen: false
			};
		default:
			return state;
	}
};
