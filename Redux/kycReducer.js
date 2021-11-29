import * as TYPES from './types';
let initialState = {
	bankDetail: {},
	personalDetailsData: {
		title: '',
		middleName: '',
		secondPhone: '',
		dob: '',
		bvn: '',
		stateOfOrigin: '',
		lgaOfOrigin: '',
		mmm: '',
		homeAddress: '',
		idType: '',
		idFile: '',
		idNumber: '',
		outLetAddress: '',
		NK_email: '',
		NK_fullName: '',
		NK_nationality: '',
		NK_relationship: '',
		NK_phone: '',
	},
	fileData: {
		utilityBillType: '',
		utilityBill: {},
		passport: {},
		cart: false,
		tent: false,
	},
	form: {
		personalDetailsData: {
			title: '',
			middleName: '',
			secondPhone: '',
			dob: '',
			bvn: '',
			stateOfOrigin: '',
			lgaOfOrigin: '',
			mmm: '',
			homeAddress: '',
			idType: '',
			idFile: '',
			idNumber: '',
			outLetAddress: '',
			NK_email: '',
			NK_fullName: '',
			NK_nationality: '',
			NK_relationship: '',
			NK_phone: '',
		},
		fileData: {
			utilityBillType: '',
			utilityBill: {},
			passport: {},
			cart: false,
			tent: false,
		},
		bankDetail: {
			bankName: '',
			accountName: '',
			accountNo: '',
			employmentStatus: '',
			natureOfBusiness: '',
			employerName: '',
			employerAddress: '',
			bankCode: '',
		},
	},
	status: '',
	rejectMessage: '',
};

const kycReducer = (state = initialState, action) => {
	switch (action.type) {
		case TYPES.UPDATE_KYC_DETAILS:
			return {
				...state,
				form: action.payload,
			};

		case TYPES.UPDATE_KYC_STATUS:
			return {
				...state,
				status: action.payload.status,
				rejectMessage: action.payload.rejectMessage,
			};

		default:
			return state;
	}
};

export default kycReducer;
