import { AxiosSecure, AxiosNoLoading, AxiosNormal } from './axios';
import { store } from '../Redux/store';
import {
	savePickUpRequest,
	saveMaterialTypes,
	saveAcceptedPickUpRequest,
	updatePendingCollection,
	updateCompositeMaterial,
	saveNotification,
	saveCoverageZone,
	saveAgent,
	updateNetWorkLoading,
	savBankList,
} from '../Redux/actionCreator';
import { calculateDistance } from '../helper/locationHelper';

const convertArrayToObject = (array, key) => {
	const initialValue = {};
	return array.reduce((obj, item) => {
		return {
			...obj,
			[item[key]]: item,
		};
	}, initialValue);
};

let getSingleCollectorPickUp = async (page = 1, refreshing = false) => {
	try {
		let userId = store.getState().normal.userData.id;
		let url = `/collectors/${userId}/pickuprequests?page=${page}&collector_accepted=pending`;
		console.log(url, 'singlePick');
		let response = await AxiosNoLoading.get(url);
		if (response.status === 200) {
			console.log(page, 'page number');
			store.dispatch(savePickUpRequest(response.data.data, refreshing));
			return;
		} else {
			//
		}
	} catch (e) {
		console.log(e, 'in pickup');
	}
};

let getAllSingleCollectorPickUp = async () => {
	try {
		let userId = store.getState().normal.userData.id;
		let url = `/collectors/${userId}/pickuprequests?collector_accepted=null`;
		console.log(url, 'all pending pickup request');
		let response = await AxiosNoLoading.get(url);
		if (response.status === 200) {
			console.log(response.data);
			return response.data.data;
		} else {
			//
		}
	} catch (e) {
		console.log(e, 'in all pickup request');
		throw e;
	}
};

let getAllPickupWithInRadius = async () => {
	try {
		let userId = store.getState().normal.userData.id;
		let url = `/pickuprequests/${userId}/radius`;
		console.log(url, 'all pending pickup request with in radius');
		let response = await AxiosNoLoading.get(url);
		if (response.status === 200) {
			console.log(response.data);
			return response.data.data;
		} else {
			//
		}
	} catch (e) {
		console.log(e, 'in all pickup radius');
		throw e;
	}
};

let getAllMaterial = async () => {
	try {
		let url = '/materials?per_page=-1';
		let response = await AxiosSecure(url);
		console.log(url, response.status);
		if (response.status === 200) {
			let dataObj = convertArrayToObject(
				response.data.data.homogeneous,
				'name'
			);
			store.dispatch(saveMaterialTypes(response.data.data.homogenous, dataObj));

			store.dispatch(updateCompositeMaterial(response.data.data.composite));
		}
	} catch (e) {
		console.log(e, 'in material');
	}
};

let acceptPickUp = async (id) => {
	try {
		let url = `/pickuprequests/${id}/accept`;
		let response = await AxiosSecure.put(url);
		if (response.status == 200) {
			console.log('accepted ', id);
			return response.data;
		}
	} catch (err) {
		console.log(err);
		store.dispatch(updateNetWorkLoading(false));
		throw err;
	}
};

let rejectPickUp = async (id) => {
	try {
		let url = `/pickuprequests/${id}/reject`;
		let response = await AxiosSecure.put(url);
		console.log(response.data, response.status);
		if (response.status == 200) {
			console.log('Rejected', id);
			return response.data;
		}
	} catch (err) {
		console.log(err);
	}
};

let getAcceptedPickupRequst = async (page, refreshing = false) => {
	let userId = store.getState().normal.userData.id;
	try {
		let url = `/collectors/${userId}/pickuprequests?collector_accepted=accepted&page=${page}`;
		let response = await AxiosNoLoading.get(url);
		if (response.status == 200) {
			console.log('accepted pickup request', userId);
			store.dispatch(saveAcceptedPickUpRequest(response.data.data, refreshing));
			return response.data;
		}
	} catch (err) {
		console.log(err);
	}
};

let getAllAcceptedPickupRequst = async () => {
	let userId = store.getState().normal.userData.id;
	try {
		let url = `/collectors/${userId}/pickuprequests?collector_accepted=accepted&status=pending&per_page=-1`;
		let response = await AxiosNoLoading.get(url);
		return response.data.data;
	} catch (err) {
		console.log(err);
		throw e;
	}
};

// let getAllCollection = async (page,refreshing) => {
//   try {
//     let url = "/collectors/BRY9FYBDX/collectedscraps?per_page=-1";
//     let response = await AxiosSecure.put(url);

//     if (response.status == 200) {
//       console.log("Log");
//       return response.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

let getAllCollection = async (page) => {
	let userId = store.getState().normal.userData.id;
	try {
		let url = `/collectors/${userId}/collectedscraps?page=${page}`;
		let response = await AxiosNoLoading.get(url);

		if (response.status == 200) {
			console.log('all collection');
			console.log(response.data, 'collection s');
			return response.data.data;
		}
	} catch (e) {
		console.log(e.response.data.error, 'collection  errors');
	}
};

let getAllPendingCollection = async () => {
	let userId = store.getState().normal.userData.id;

	try {
		let url = `/collectors/${userId}/collectedscraps?per_page=-1&drop_off_status=!droppedoff`;
		let response = await AxiosSecure.get(url);
		return response.data;

		store.dispatch(updatePendingCollection(response.data.data));
	} catch (e) {
		console.log(e);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let getComissionBalance = async () => {
	let userId = store.getState().normal.userData.id;
	let url = `/wallets/${userId}/balance`;
	try {
		let response = await AxiosNoLoading.get(url);
		if (response.status === 200) return response.data;
	} catch (e) {
		console.log(e, 'bll');
		throw e;
	}
};

let getPendingComissionBalance = async () => {
	let userId = store.getState().normal.userData.id;
	let url = `/wallets/${userId}/pending-commission`;
	try {
		let response = await AxiosNoLoading.get(url);
		if (response.status === 200) return response.data;
	} catch (e) {
		console.log(e, 'pending bll');

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let getCOGbalance = async () => {
	let userId = store.getState().normal.userData.id;
	let url = `/wallets/${userId}/balance?wallet=cog`;
	try {
		let response = await AxiosNoLoading.get(url);
		if (response.status === 200) return response.data;
	} catch (e) {
		store.dispatch(updateNetWorkLoading(false));
		console.log(e, 'cog');
		throw e;
	}
};

let getBankList = async (returnOnly) => {
	let url = `/wallets/banks`;
	try {
		let response = await AxiosNoLoading.get(url);
		console.log(response.data.data);
		if (response.status === 200) {
			if (returnOnly) {
				return response.data.data;
			} else {
				store.dispatch(savBankList(response.data.data));
			}
		}
	} catch (e) {
		console.log(e, 'inbank');

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let transferFromCommission = async (payload) => {
	let url = '/wallets/withdraw';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let airtimeTransfer = async (payload) => {
	let url = '/wallets/airtime';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let airtimeTransferCOG = async (payload) => {
	let url = '/wallets/airtime?wallet=cog';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let transferFromAccount = async (payload) => {
	let url = '/wallets/withdraw?wallet=cog';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let walletToWalletTransfer = async (payload) => {
	let url = '/wallets/transfer';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let walletToWalletTransferCOG = async (payload) => {
	let url = '/wallets/transfer?wallet=cog';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let interWalletTransfer = async (payload) => {
	let url = '/wallets/transfer/interwallet';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let fundWallet = async (payload) => {
	let url = '/wallets/fund';

	try {
		let response = await AxiosSecure.put(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let initializeFunding = async (payload) => {
	let url = '/wallets/fund/initialize';
	try {
		let response = await AxiosSecure.post(url, payload);
		return response.data;
	} catch (e) {
		console.log(e);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let updateLocation = async (lat, lng) => {
	let id = store.getState().normal.userData.id;
	try {
		console.log(lat, lng);
		let response = await AxiosNoLoading.post('/locations/ping', {
			lat,
			lng,
			id,
		});
		console.log(response.data);
	} catch (e) {
		console.log(e);
	}
};

let updateProfile = async (data) => {
	// console.log(data);
	let id = store.getState().normal.userData.id;
	let url = `/auth/collectors/${id}?_method=PUT`;
	try {
		console.log(url);
		let response = await AxiosSecure.post(url, data);
		console.log(response.data);

		return response.data;
	} catch (e) {
		store.dispatch(updateNetWorkLoading(false));
		console.log(e, 'in update Profile');
		throw e;
	}
};

let getAllCoverageRegion = async () => {
	let url = `/majorareas?per_page=-1`;
	try {
		let response = await AxiosNormal.get(url);
		if (response.status === 200) {
			let sort = response.data.data.sort(function (a, b) {
				return ('' + a.name).localeCompare(b.name);
			});

			store.dispatch(saveCoverageZone(sort));
			return;
		}
	} catch (e) {
		console.log(e.response.data.error, 'in coverage Zone');
		// throw e;
	}
};

let gettAllAgent = async () => {
	let id = store.getState().normal.userData.id;
	let url = `/agents?per_page=-1`;
	try {
		let response = await AxiosSecure.get(url);
		if (response.status === 200) {
			let data = response.data.data.filter(
				(k) =>
					k.userable &&
					k.userable.coordinates !== null &&
					k.userable.coordinates?.lat !== null &&
					k.userable.availability == true &&
					k.userable.ready_for_work == 1
			);

			let cur = store.getState().location.coordinate;
			for (let i = 0; i < data.length; i++) {
				console.log(i, data.length, 'llll');
				data[i]['distance'] = calculateDistance(
					Number(cur.lat),
					Number(cur.lng),
					Number(data[i].userable.coordinates.lat),
					Number(data[i].userable.coordinates.lng),
					'K'
				);
			}

			let newData = data.filter((i) => i.distance < 4);

			newData.sort(function (a, b) {
				return a.distance - b.distance;
			});
			console.log(data, 'all agent');
			//change

			store.dispatch(saveAgent(newData));
			return;
		}
	} catch (e) {
		console.log(e);
		// console.log(e.response.data.error, 'in getting all agent');
		// throw e;
	}
};

let submitPickup = async (payload) => {
	let url = `/collectedscraps`;
	try {
		let response = await AxiosSecure.post(url, payload);
		console.log(response.data);
	} catch (e) {
		console.log(e, 'in submiting pickup reqest');

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let verifyPhone = async (data) => {
	console.log(data, 'dat in vee');
	let url = '/auth/phone/verify';
	try {
		let response = await AxiosSecure.post(url, data);
		console.log(response.data, 'veriyDaddd');
		return response.data;
	} catch (e) {
		console.log(e, 'icode veryfication');
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

const sendVerificationCodeAgain = async (phone) => {
	let url = '/auth/phone/verify/resend';
	console.log(phone);
	try {
		let response = await AxiosNormal.post(url, { phone });
		console.log(response.data, 'resindin');
	} catch (e) {
		console.log(e.response.data.error, 'send againg');

		store.dispatch(updateNetWorkLoading(false));
	}
};

const getProducerDetails = async (details) => {
	let url = `/users/${details.phone}/producer-name`;
	console.log(url);
	try {
		let response = await AxiosSecure.get(url);
		console.log(response.data, 'produces details');
		return response.data;
	} catch (e) {
		console.log(e.response.data.error);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let getUserName = async (phone) => {
	let url = `/users/${phone}/name`;
	console.log(url);
	try {
		let response = await AxiosSecure.get(url);
		console.log(response.data, 'user name details');
		return response.data;
	} catch (e) {
		console.log(e.response.data.error);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let getWalletHistory = async () => {
	let id = store.getState().normal.userData.id;
	let url = `/wallets/${id}/history?per_page=-1`;
	console.log(url);
	try {
		let response = await AxiosNoLoading.get(url);
		console.log(response.data, 'history');
		return response.data;
	} catch (e) {
		console.log(e.response.data.error);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let getWalletHistoryCOG = async () => {
	let id = store.getState().normal.userData.id;
	let url = `/wallets/${id}/history?wallet=cog&per_page=-1`;
	console.log(url);
	try {
		let response = await AxiosNoLoading.get(url);
		console.log(response.data, 'histoy');
		return response.data;
	} catch (e) {
		console.log(e.response.data.error);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let getAccountName = async (payload) => {
	let url = `/wallets/account-number/resolve?account_number=${payload.account}&bank_code=${payload.bankCode}`;
	console.log(url);
	try {
		let response = await AxiosSecure.get(url);
		console.log(response.data, 'acount name');
		return response.data;
	} catch (e) {
		console.log(e.response.data.error);

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

const notifyAgent = async (agentId) => {
	let id = store.getState().normal.userData.id;
	let url = `/collectors/${id}/dropoffs/notify`;
	console.log(url);
	try {
		let response = await AxiosSecure.post(url, {
			agent_id: agentId,
		});
	} catch (e) {
		console.log(e, 'lloo');

		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

const bulkUpload = async (payload) => {
	let url = '/listedscraps';
	try {
		let response = await AxiosSecure.post(url, payload);
	} catch (error) {
		console.log(error);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

const updateDeviceToken = async () => {
	let id = store.getState().normal.userData.id;
	let pushToken = store.getState().normal.devicePushToken;
	console.log(pushToken, 'ppppp0000');
	let url = `/auth/${id}/device-registration-id/update`;
	try {
		let response = await AxiosNoLoading.put(url, {
			registration_id: pushToken,
		});
	} catch (error) {
		console.log(error);
	}
};

const getAllNofification = async () => {
	const { id } = store.getState().normal.userData;
	const url = `/users/${id}/notifications?per_page=-1`;
	try {
		const response = await AxiosSecure.get(url);

		store.dispatch(saveNotification(response.data.data));
		return response.data.data;
	} catch (e) {
		console.log(e.response.data.error, 'in notification');
		// throw e;
	}
};

const deleteNotification = async (notificationId) => {
	const { id } = store.getState().normal.userData;
	const url = `/users/${id}/notifications/${notificationId}`;
	try {
		const response = await AxiosSecure.delete(url);

		return response.data.data;
	} catch (e) {
		console.log(e.response.data.error, 'in notification');
		store.dispatch(updateNetWorkLoading(false));

		throw e;
	}
};

const compositeMaterialRequest = async (payload) => {
	const { id } = store.getState().normal.userData;

	const url = `/composite-material-requests`;
	try {
		const response = await AxiosSecure.post(url, payload);

		return response.data.data;
	} catch (e) {
		store.dispatch(updateNetWorkLoading(false));

		throw e;
	}
};

let getPendingPayment = async () => {
	let id = store.getState().normal.userData.id;
	let url = `/collectors/${id}/dropoffs?collector_accepted=pending&group_by=agent_id`;
	console.log(url);
	try {
		let response = await AxiosNoLoading.get(url);

		return response.data;
	} catch (e) {
		console.log(e.response.data.error);
		store.dispatch(updateNetWorkLoading(false));
		throw e;
	}
};

let acceptPayment = async (dropoffId) => {
	let id = store.getState().normal.userData.id;
	let url = `/collectors/${id}/dropoffs/accept`;
	try {
		let response = await AxiosSecure.put(url, { drop_off_id: dropoffId });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

let rejectPayment = async (dropoffId) => {
	let id = store.getState().normal.userData.id;
	let url = `/collectors/${id}/dropoffs/reject`;
	try {
		let response = await AxiosSecure.put(url, { drop_off_id: dropoffId });
	} catch (error) {
		console.log(error);
		throw error;
	}
};

let getSinglePickup = async (pickupId) => {
	console.log(pickupId, 'pppppppppppppppppppppppppppppp');
	let id = store.getState().normal.userData.id;
	let url = `/pickuprequests/${pickupId}`;

	try {
		let response = await AxiosSecure.get(url);
		console.log(response.data, 'llll');
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export {
	getSingleCollectorPickUp,
	getAllMaterial,
	acceptPickUp,
	rejectPickUp,
	getAllCollection,
	getAcceptedPickupRequst,
	getAllPendingCollection,
	getCOGbalance,
	getComissionBalance,
	updateLocation,
	updateProfile,
	getAllNofification,
	getAllCoverageRegion,
	gettAllAgent,
	getAllSingleCollectorPickUp,
	getAllAcceptedPickupRequst,
	submitPickup,
	verifyPhone,
	getAllPickupWithInRadius,
	sendVerificationCodeAgain,
	transferFromAccount,
	transferFromCommission,
	getBankList,
	walletToWalletTransfer,
	fundWallet,
	getProducerDetails,
	getUserName,
	airtimeTransfer,
	initializeFunding,
	getWalletHistory,
	getWalletHistoryCOG,
	getPendingComissionBalance,
	getAccountName,
	notifyAgent,
	bulkUpload,
	updateDeviceToken,
	deleteNotification,
	compositeMaterialRequest,
	getPendingPayment,
	acceptPayment,
	rejectPayment,
	interWalletTransfer,
	getSinglePickup,
	airtimeTransferCOG,
	walletToWalletTransferCOG,
};
