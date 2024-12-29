import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { Bounce, toast } from "react-toastify";

const initialState = {
	entities: [
		{
			id: "23-1-24",
			date: "06.01.2024",
			status: "Затверджується",
			customer: "Іванов",
		},
	],
	isLoading: false,
	error: null,
};

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		requested: (state) => {
			state.isLoading = true;
		},
		received: (state, action) => {
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

const { reducer: ordersReducer, actions } = ordersSlice;
const { requested, received, requestedFailed, add, remove } = actions;

export const createOrder = (payload) => async (dispatch) => {
	const today = Date.now();
	const timestamp = new Date(new Date(today).setHours(0, 0, 0, 0)).getTime();
	const order = {
		...payload,
		_id: nanoid(),
        status:"Затверджується",
		createdAt: timestamp,
	};
	dispatch(requested());
	try {
		dispatch(add(order));
		toast(`Заявка зроблена`, {
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

export const getOrderById = (id) => (state) =>
	state.orders.entities.find((n) => n.id === id);

export const getOrders = () => (state) => state.orders.entities;
export const getOrdersLoadingStatus = () => (state) => state.orders.isLoading;

export default ordersReducer;
