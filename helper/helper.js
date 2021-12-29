import { AxiosNoLoading } from '../Api/axios';

export const numberWithCommas = (x) => {
	if (!x && x !== 0) return null;
	const amount = parseFloat(x).toFixed(2);
	return '₦' + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const fetchAllWrapper = (obj, list) => {
	return new Promise((resolve, reject) => {
		return fetchAll(obj, list, resolve);
	});
};

let fetchAll = (obj, list, resolve) => {
	if (obj.next_page_url) {
		AxiosNoLoading.get(obj.next_page_url).then((response) => {
			fetchAll(response.data, [...list, ...response.data.data], resolve);
		});
	} else {
		resolve(list);
	}
};
