import * as TYPES from './types';

const updateNetWork = (connected) => {
	return {
		type: TYPES.NETWORKCHANGES,
		payload: connected,
	};
};

const savePickUpRequest = (data, refreshing) => {
	console.log(refreshing, 'refreshing in save ', data.length);
	return {
		type: TYPES.COLLECTORPICKUPREQUEST,
		payload: {
			data,
			refreshing,
		},
	};
};

const updateUserData = (data) => {
	return {
		type: TYPES.SAVEDATA_TYPE,
		payload: data,
	};
};

const saveAcceptedPickUpRequest = (data, refreshing) => {
	console.log(refreshing, 'refreshing in save ', data.length);
	return {
		type: TYPES.ACCEPTED_PICKUPREQUEST_TYPE,
		payload: {
			data,
			refreshing,
		},
	};
};

const saveMaterialTypes = (dataArray, dataObject) => {
	// console.log(data, "material");
	return {
		type: TYPES.MATERIALTYPE,
		payload: {
			materialArray: dataArray,
			materialObject: dataObject,
		},
	};
};

const updateContentLoading = (status) => {
	return {
		type: TYPES.CONTENT_LOADING_TYPE,
		payload: status,
	};
};

const saveUserData = (data, token) => {
	console.log(data, 'saving user data');
	return {
		type: TYPES.SAVEUSERDATA,
		payload: {
			userData: data.data,
			token: data.token,
		},
	};
};

const savePickupAndImages = () => {
	return {
		type: TYPES.PICKUPANDIMAGETYPE,
	};
};

const updateBleCon = (state) => {
	return {
		type: TYPES.UPDATEBLUETOOTHSTATE,
		payload: state,
	};
};

const saveBonded = (list) => {
	return {
		type: TYPES.BONDEDTYPE,
		payload: list,
	};
};
const saveDiscoveringState = (state) => {
	return {
		type: TYPES.DISCOVERINGTYPE,
		payload: state,
	};
};

const saveDiscoverList = (list) => {
	return {
		type: TYPES.DISCOVERLISTYPE,
		payload: list,
	};
};

const updateSelectedDevice = (obj) => {
	return {
		type: TYPES.UPDATESELECTEDTYPE,
		payload: obj,
	};
};

const updateConnected = (state) => {
	return {
		type: TYPES.CONNECTEDTYPE,
		payload: state,
	};
};

const upadteBleMessage = (text) => {
	return {
		type: TYPES.BLEMESSAGETYPE,
		payload: text,
	};
};

const updateBluetoothStatus = (status) => {
	return {
		type: TYPES.BLESTATUSTYPE,
		payload: status,
	};
};

const updateNetWorkLoading = (status) => {
	return {
		type: TYPES.NETWORK_LOADING_TYPE,
		payload: status,
	};
};

const updatePendingCollection = (datas) => {
	return {
		type: TYPES.PENDING_COLLECTION,
		payload: datas,
	};
};

const materialLoaded = () => {
	return {
		type: TYPES.MATERIAL_LOADED_TYPE,
	};
};

const updateSideBar = (status) => {
	console.log(status, 'll');
	return {
		type: TYPES.SIDEBAR_TYPE,
		payload: status,
	};
};

const updateCompositeMaterial = (list) => {
	let compositeObj = {};
	list.forEach((i) => {
		if (compositeObj.hasOwnProperty(i.class)) {
			compositeObj[i.class].push(i);
		} else {
			compositeObj[i.class] = [i];
		}
	});
	return {
		type: TYPES.COMPOSITE_TYPE,
		payload: compositeObj,
	};
};

const saveNotification = (list) => {
	return {
		type: TYPES.NOTIFICATION_TYPE,
		payload: list,
	};
};

const saveCoverageZone = (list) => {
	let newList = {};
	list.forEach((i) => {
		if (newList.hasOwnProperty(i.lga)) {
			newList[i.lga].push(i);
		} else {
			newList[i.lga] = [i];
		}
	});

	return {
		type: TYPES.COVERAGE_ZONE_TYPE,
		payload: newList,
	};
};

const saveAgent = (list) => {
	return {
		type: TYPES.AGENT_TYPE,
		payload: list,
	};
};

const saveLoginLocation = (obj) => {
	return {
		type: TYPES.LATLNG_TYPE,
		payload: obj,
	};
};

const saveAllCollection = (data, refreshing) => {
	console.log(refreshing, 'refreshing in save ', data.length);
	return {
		type: TYPES.ALL_COLLECTION,
		payload: {
			data,
			refreshing,
		},
	};
};
const updateLoggedIn = (status) => {
	console.log(status, 'changing Status');
	return {
		type: TYPES.LOGIN_TYPE,
		payload: status,
	};
};

const updateNewRequestPop = (status) => {
	return {
		type: TYPES.NEW_REQUEST_TYPE,
		payload: status,
	};
};

const updateNewNotificationPop = (status) => {
	return {
		type: TYPES.NEW_NOTIFICATION_TYPE,
		payload: status,
	};
};

const savBankList = (data) => {
	return {
		type: TYPES.BANK_TYPE,
		payload: data,
	};
};

const updatePushToken = (token) => {
	return {
		type: TYPES.DEVICETOKEN,
		payload: token,
	};
};

const updateMessageAlert = (status) => {
	console.log(status, 'oppp');
	return {
		type: TYPES.MESSAGEALERT,
		payload: status,
	};
};

const updatePickuAlert = (status) => {
	return {
		type: TYPES.PICkUPALERT,
		payload: status,
	};
};

const updatePickupAlertModal = (status) => {
	return {
		type: TYPES.PICkUPALERTMODAL,
		payload: status,
	};
};

const updateRedirect = (obj) => {
	return {
		type: TYPES.REDIRECT,
		payload: obj,
	};
};

const updateKycNoteModal = (data) => {
	console.log(data, 'pp');
	return {
		type: TYPES.KYC_NOTE_TYPE,
		payload: data,
	};
};
const updateUserDetails = (data) => {
	console.log(data, 'updating user data');
	return {
		type: TYPES.UPDATE_USER_DETAILS,
		payload: data,
	};
};

const updateKycFormData = (data) => {
	return {
		type: TYPES.UPDATE_KYC_DETAILS,
		payload: data,
	};
};

const updateKycStatus = (status, rejectMessage) => {
	return {
		type: TYPES.UPDATE_KYC_STATUS,
		payload: {
			status,
			rejectMessage,
		},
	};
};

const updateInternetErrorModal = (status) => {
	console.log(status, 'internet');
	return {
		type: TYPES.INTERNET_ERROR,
		payload: status,
	};
};

export {
	updateNetWork,
	saveUserData,
	savePickUpRequest,
	saveMaterialTypes,
	savePickupAndImages,
	updateBleCon,
	saveBonded,
	saveDiscoverList,
	saveDiscoveringState,
	updateSelectedDevice,
	updateConnected,
	upadteBleMessage,
	updateBluetoothStatus,
	updateNetWorkLoading,
	materialLoaded,
	updateContentLoading,
	saveAcceptedPickUpRequest,
	updatePendingCollection,
	updateSideBar,
	updateCompositeMaterial,
	saveNotification,
	saveCoverageZone,
	saveAgent,
	saveLoginLocation,
	saveAllCollection,
	updateLoggedIn,
	updateNewRequestPop,
	updateNewNotificationPop,
	updateUserData,
	savBankList,
	updatePushToken,
	updatePickuAlert,
	updateMessageAlert,
	updatePickupAlertModal,
	updateRedirect,
	updateKycNoteModal,
	updateUserDetails,
	updateKycFormData,
	updateKycStatus,
	updateInternetErrorModal,
};
