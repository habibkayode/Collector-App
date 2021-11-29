import axios from 'axios';
import { store } from '../Redux/store';
import {
	updateInternetErrorModal,
	updateLoggedIn,
	updateNetWorkLoading,
} from '../Redux/actionCreator';
import { Alert } from 'react-native';

//export let imageUrl = 'https://staging.scrapays.com';
export let imageUrl = 'https://api.scrapays.com';

//export let baseURL = 'https://staging.scrapays.com/v1';
export const baseURL = 'https://api.scrapays.com/v1';

let errFun = (error) => {
	console.log(error, 'in error fun');
	if (!error.response) {
		store.dispatch(updateNetWorkLoading(false));
		store.dispatch(updateInternetErrorModal(true));
		throw error;
	} else if (
		error.response.status === 401 &&
		error.response.data.error === 'Invalid token'
	) {
		store.dispatch(updateLoggedIn(false));
		store.dispatch(updateNetWorkLoading(false));
		Alert.alert('Session Expired', 'Please login again');
	} else {
		console.log(error.response.data);
		throw error;
	}
};

let AxiosNormal = axios.create({
	baseURL: baseURL,
});

AxiosNormal.interceptors.request.use((config) => {
	store.dispatch(updateNetWorkLoading(true));

	return config;
});

AxiosNormal.interceptors.response.use((repons) => {
	store.dispatch(updateNetWorkLoading(false));
	// console.log(repons, "axios normal");
	return repons;
}, errFun);

let AxiosSecure = axios.create({
	baseURL,
});

AxiosSecure.interceptors.request.use((config) => {
	store.dispatch(updateNetWorkLoading(true));
	let token = store.getState().normal.token;
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

AxiosSecure.interceptors.response.use((repons) => {
	store.dispatch(updateNetWorkLoading(false));
	return repons;
}, errFun);

let AxiosNoLoading = axios.create({
	baseURL,
});

AxiosNoLoading.interceptors.request.use((config) => {
	let token = store.getState().normal.token;
	config.headers.Authorization = `Bearer ${token}`;
	return config;
});

AxiosNoLoading.interceptors.response.use((repons) => {
	store.dispatch(updateNetWorkLoading(false));
	return repons;
}, errFun);

export { AxiosNormal, AxiosSecure, AxiosNoLoading };
