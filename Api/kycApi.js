import { AxiosSecure, AxiosNoLoading, AxiosNormal } from './axios';
import { store } from '../Redux/store';
import {
	updateKycFormData,
	updateKycStatus,
	updateNetWorkLoading,
} from '../Redux/actionCreator';
import { getUserDetails } from './authApi';

const submitKyc = async (payload) => {
	console.log(payload, 'submit payload');
	let url = `/kyc`;
	try {
		let response = await AxiosSecure.post(url, payload);
	} catch (error) {
		store.dispatch(updateNetWorkLoading(false));
		console.log(error, error.message, 'pppp');
		throw error;
	}
};

const getSingleUserKyc = async (storeKyc) => {
	let agentId = store.getState().normal.userData.id;

	let url = `/users/${agentId}/kyc`;
	try {
		let response = await AxiosSecure.get(url);
		if (storeKyc) {
			let kycData = response.data.data;
			if (kycData) {
				let obj = {
					personalDetailsData: {
						title: kycData.title,
						middleName: kycData.middle_name,
						secondPhone: kycData.second_phone,
						dob: kycData.dob,
						bvn: kycData.bank_details.bvn,
						stateOfOrigin: kycData.state_of_origin,
						lgaOfOrigin: kycData.lga_of_origin,
						mmm: kycData.mmn,
						homeAddress: kycData.home_address,
						idType: kycData.id_type,
						idFile: kycData.id_file,
						idNumber: kycData.id_number,
						outLetAddress: '',
						NK_email: kycData.next_of_kin.email,
						NK_fullName: kycData.next_of_kin.full_name,
						NK_nationality: kycData.next_of_kin.nationality,
						NK_relationship: kycData.next_of_kin.relationship,
						NK_phone: kycData.next_of_kin.phone,
					},
					bankDetail: {
						bankName: kycData.bank_details.bank_name,
						accountName: kycData.bank_details.account_name,
						accountNo: kycData.bank_details.account_number,
						employerAddress: kycData.employment_details.employer_address,
						employerName: kycData.employment_details.employer_name,
						employmentStatus: kycData.employment_details.status,
						natureOfBusiness: kycData.employment_details.nature_of_business,
					},
					fileData: {
						utilityBillType: kycData.utility_bill_type,
						utilityBill: kycData.utility_bill,
						passport: kycData.passport,
						cart: kycData.given_cart ? true : false,
						tent: kycData.given_tent ? true : false,
					},
				};
				store.dispatch(updateKycFormData(obj));
				store.dispatch(updateKycStatus(kycData.status, kycData.reject_message));
			}
		}

		return response.data;
	} catch (error) {
		store.dispatch(updateNetWorkLoading(false));
		console.log(error, error.message, 'pppp');
		throw error;
	}
};

const agreeToAsset = async () => {
	let agentId = store.getState().normal.userData.id;

	let url = `/users/${agentId}/asset-agreement/accept`;
	try {
		let response = await AxiosSecure.put(url);
		console.log('in here');
		getUserDetails();
		return response;
	} catch (error) {
		store.dispatch(updateNetWorkLoading(false));
		console.log(error, error.message, 'pppp');
		throw error;
	}
};

export { submitKyc, getSingleUserKyc, agreeToAsset };
