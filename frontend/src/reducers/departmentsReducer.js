import { types } from '../types/types';

// departments Reducer
const initialState = {
	departments: [],
	loadingDepartments: false
};

export const departmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.departmentsLoaded:
			return {
				...state,
				departments: [ ...action.payload ]
			};

		case types.loadingDepartments:
			return {
				...state,
				loadingDepartments: action.payload
			};

		default:
			return state;
	}
};
