import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { checkDataFolderAndFile, updateJsonFile } from "../utils/jsonRecorder";
import { Bounce, toast } from "react-toastify";
import { getDataFromLocalStorage, updateLocalStorageData } from "../utils/localStorage";

const initialState = {
	entities: [],
	isLoading: false,
	error: null,
};

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		employeesRequested: (state) => {
			state.isLoading = true;
		},
		employeesReceived: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		employeesRequestedFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		addEmployee: (state, action) => {
			state.entities.push(action.payload);
			state.isLoading = false;
		},
		removeEmployee: (state, action) => {
			state.entities.splice(
				state.entities.findIndex((c) => c._id === action.payload.id),
				1
			);
			state.isLoading = false;
		},
		/* editEmployee: (state, action) => {} */
	},
});

const { reducer: employeesReducer, actions } = employeesSlice;
const {
	employeesRequested,
	employeesReceived,
	employeesRequestedFailed,
	addEmployee,
	removeEmployee,
} = actions;

export const createEmployee = (payload) => async (dispatch) => {
	const today = Date.now();
	const timestamp = new Date(new Date(today).setHours(0, 0, 0, 0)).getTime();
	const employee = {
		...payload,
		_id: nanoid(),
		createdAt: timestamp,
		tasks: [],
		tools: [],
	};
	dispatch(employeesRequested());
	try {
		dispatch(addEmployee(employee));
		updateLocalStorageData("empl", employee);
		toast("Данні співробітника записані", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
	} catch (error) {
		toast(error.message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
		dispatch(employeesRequestedFailed(error.message));
	}
};

export const loadEmployees = () => async (dispatch) => {
	dispatch(employeesRequested());
	try {
        let data = JSON.parse(localStorage.getItem("empl"))
        if (data === null ){
            data = getDataFromLocalStorage("empl")
        }
        console.log(data)
        dispatch(employeesReceived(data))
	} catch (error) {
		toast(error.message, {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
			transition: Bounce,
		});
		dispatch(employeesRequestedFailed(error.message));
	}
};

export const getEmployees = () => (state) => state.employees.entities;

export default employeesReducer;
