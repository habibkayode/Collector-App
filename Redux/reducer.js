import * as TYPES from './types';
let initialState = {
	token: '',
	logedIn: false,
	connetcted: false,
	userData: {},
	pickupRequests: [],
	acceptedPickupRequests: [],
	materials: [],
	materialsObj: {},
	pickupAndImage: [],
	bluetoothDevice: undefined,
	bluetoothEnabled: true,
	networkLoading: false,
	materialLoaded: false,
	contentLoading: false,
	pendingCollection: [],
	showSideBar: false,
	compositeMaterial: {},
	notifications: [],
	coverageZone: {},
	agents: [],
	allCollection: [],
	loggedIn: false,
	requestPop: false,
	notificationsPop: false,
	bankList: [],
	devicePushToken: '',
	showMessageAlert: false,
	showPickupAlert: false,
	pickupAlertModal: {},
	redirect: { status: false },
	kycNoteModal: true,
	internetError: false,
};

const reducerFunc = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.INTERNET_ERROR:
			return {
				...state,
				internetError: action.payload,
			};
		case TYPES.KYC_NOTE_TYPE:
			return {
				...state,
				kycNoteModal: action.payload,
			};
		case TYPES.UPDATE_USER_DETAILS:
			return {
				...state,
				userData: action.payload,
			};
		case TYPES.REDIRECT:
			console.log(action.payload);
			return {
				...state,
				redirect: action.payload,
			};
		case TYPES.PICkUPALERTMODAL:
			console.log(action.payload);
			return {
				...state,
				pickupAlertModal: action.payload,
			};

		case TYPES.PICkUPALERT:
			return {
				...state,
				showPickupAlert: action.payload,
			};

		case TYPES.MESSAGEALERT:
			console.log(action.payload, 'poopp00');
			return {
				...state,
				showMessageAlert: action.payload,
			};

		case TYPES.DEVICETOKEN:
			return {
				...state,
				devicePushToken: action.payload,
			};

		case TYPES.BANK_TYPE:
			return {
				...state,
				bankList: action.payload,
			};
		case TYPES.SAVEDATA_TYPE:
			return {
				...state,
				userData: action.payload,
			};
		case TYPES.NEW_NOTIFICATION_TYPE:
			return {
				...state,
				requestPop: action.payload,
			};
		case TYPES.NEW_REQUEST_TYPE:
			return {
				...state,
				requestPop: action.payload,
			};
		case TYPES.LOGIN_TYPE:
			return {
				...state,
				loggedIn: action.payload,
			};

		case TYPES.ALL_COLLECTION:
			let newCollection;
			if (action.payload.refreshing) {
				newCollection = [...action.payload.data];
			} else {
				console.log('i am not refreshing in accepted');
				newCollection = [...state.allCollection, ...action.payload.data];
			}
			return {
				...state,
				allCollection: newCollection,
			};

		case TYPES.AGENT_TYPE:
			return {
				...state,
				agents: action.payload,
			};
		case TYPES.COVERAGE_ZONE_TYPE:
			return {
				...state,
				coverageZone: action.payload,
			};

		case TYPES.NOTIFICATION_TYPE:
			return {
				...state,
				notifications: action.payload,
			};

		case TYPES.COMPOSITE_TYPE:
			return {
				...state,
				compositeMaterial: action.payload,
			};

		case TYPES.SIDEBAR_TYPE:
			return {
				...state,
				showSideBar: payload,
			};
		case TYPES.PENDING_COLLECTION:
			return {
				...state,
				pendingCollection: action.payload,
			};

		case TYPES.ACCEPTED_PICKUPREQUEST_TYPE:
			let newData = [];
			if (action.payload.refreshing) {
				console.log('i am reshing in accetped');
				newData = [...action.payload.data];
			} else {
				console.log('i am not refreshing in accepted');
				newData = [...state.acceptedPickupRequests, ...action.payload.data];
			}
			return {
				...state,
				acceptedPickupRequests: newData,
			};

		case TYPES.CONTENT_LOADING_TYPE:
			return {
				...state,
				contentLoading: payload,
			};
		case TYPES.MATERIAL_LOADED_TYPE:
			return {
				...state,
				materialLoaded: true,
			};
		case TYPES.NETWORK_LOADING_TYPE:
			return {
				...state,
				networkLoading: action.payload,
			};
		case TYPES.NETWORKCHANGES:
			return {
				...state,
				connetcted: action.payload,
			};
		case TYPES.SAVEUSERDATA:
			return {
				...state,
				userData: action.payload.userData,
				token: action.payload.token,
			};
		case TYPES.COLLECTORPICKUPREQUEST:
			let newPickupRequest = [];
			if (action.payload.refreshing) {
				console.log('i am reshingis');
				newPickupRequest = [...action.payload.data];
			} else {
				console.log('i am not refreshing');
				newPickupRequest = [...state.pickupRequests, ...action.payload.data];
			}
			return {
				...state,
				pickupRequests: newPickupRequest,
			};
		case TYPES.MATERIALTYPE:
			return {
				...state,
				materials: action.payload.materialArray,
				materialsObj: action.payload.materialObject,
			};
		case TYPES.PICKUPANDIMAGETYPE:
			console.log('pickup');
			let newPickup = state.pickupRequests.map((ele) => {
				let newObj = {
					...ele,
					materials: ele.materials,
				};
				console.log(newObj.materials);
				let newMaterials = newObj.materials.map((k) => {
					let actualMaterial = state.materials.findIndex((m) => {
						console.log(m.name, k);
						return m.name === k;
					});
					//changes needed
					console.log(actualMaterial, 'actual');
					return state.materials[actualMaterial];
				});
				newObj.newMaterials = newMaterials;
				return newObj;
			});
			//  console.log(newPickup, "picku + images");
			return {
				...state,
				pickupAndImage: newPickup,
			};
		default:
			return state;
	}
};

export { reducerFunc };
