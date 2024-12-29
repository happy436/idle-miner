import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Bounce, toast } from "react-toastify";

const initialState = {
	entities: [
		{
			orderId: "23-1-24",
			tasks: [
				{
					id: "oi1j2oidj12oi",
					performer: "Іванов",
					number: "",
					product: "valves",
					status: "Затверджується",
					description: "Треба приспособа для двох отворів",
				},
				{
					id: "a12k3lklw93j",
					performer: "Петренко",
					number: "",
					product: "pipes",
					status: "Затверджується",
					description: "Зміна розміру труб під час виробництва",
				},
			],
		},
	],
	isLoading: false,
	error: null,
};

const tasksSlice = createSlice({
	name: "tasks",
	initialState,
	reducers: {
		requested: (state) => {
			state.isLoading = true;
		},
		Received: (state, action) => {
			state.entities = action.payload;
			state.isLoading = false;
		},
		requestedFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		add: (state, action) => {
			state.entities.push(action.payload);
			state.isLoading = false;
		},
		remove: (state, action) => {
			state.entities.splice(
				state.entities.findIndex((c) => c._id === action.payload.id),
				1
			);
			state.isLoading = false;
		},
	},
});

const { reducer: tasksReducer, actions } = tasksSlice;
const { requested, received, requestedFailed, add, remove } = actions;

export const createTask = (payload) => async (dispatch) => {
	const today = Date.now();
	const timestamp = new Date(new Date(today).setHours(0, 0, 0, 0)).getTime();
	const task = {
		...payload,
		_id: nanoid(),
		createdAt: timestamp,
	};
	dispatch(requested());
	try {
		dispatch(add(task));
		toast(`Задача зроблена`, {
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
		dispatch(requestedFailed(error.message));
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
	}
};

export const getTasks = () => (state) => state.tasks.entities;
export const getTasksById = (id) => (state) =>
	state.tasks.entities.find((n) => n.orderId === id);

export default tasksReducer;
