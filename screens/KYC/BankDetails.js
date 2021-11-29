import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Bgcover from '../../Component/Bg/BackgroundCover';
import { Dropdown } from 'react-native-material-dropdown';
import UnderLineInput from '../../Component/input/UnderlineInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../Styles/colors';
import { styles } from '../../Styles/globalStyles';
import FileUploadUi from '../../Component/Upload/FileUpload';
import { PagesName } from './constant';
import StepIndicator from '../../Component/StepIndicator/indicator';
import Next from '../../Component/Next';
import Back from '../../Component/Back';
import BankDetailsInput from '../../Component/BankDetailsInputs';

import { useRoute } from '@react-navigation/native';
import KycHeader from '../../Component/Header/KycHeader';
import GeneralError from '../../Component/Error/GeneralError';
import { getAccountName, getBankList } from '../../Api/api';
import { updateKycFormData } from '../../Redux/actionCreator';

const BankDetails = (props) => {
	const [showBirthDay, setShowBirthDay] = useState(false);
	const [showError, setShowError] = useState(true);
	const [bankList, setBankList] = useState([]);
	const [accountDetails, setAccountDetails] = useState({});

	const [bankDetail, setBankDetail] = useState({
		bankName: '',
		accountName: '',
		accountNo: '',
		employmentStatus: '',
		natureOfBusiness: '',
		employerName: '',
		employerAddress: '',
		bankCode: '',
	});
	const [date, setDate] = useState(new Date(1598051730000));
	const [show, setShow] = useState(false);

	let { fileData } = useRoute().params;

	//console.log(personalDetailsData, fileData, 'llll');

	let getAccountDetail = async (bankCode, accountName) => {
		try {
			let response = await getAccountName({
				bankCode: bankCode,
				account: accountName,
			});
			console.log(response.data, 'account Details');
			setAccountDetails(response.data);
			setBankDetail((prev) => ({
				...prev,
				accountName: response.data?.account_name,
			}));
		} catch (e) {
			Alert.alert('Error', e.response.data.error);
		}
	};

	const handleNext = () => {
		let {
			bankName,
			accountName,
			accountNo,
			employerAddress,
			employerName,
			employmentStatus,
			natureOfBusiness,
		} = bankDetail;

		if (
			bankName.length < 3 ||
			accountName.length < 5 ||
			accountNo.length !== 10 ||
			employmentStatus.length < 5
		) {
			setShowError(true);
			Alert.alert('Info', 'please fill the required field');
		} else {
			props.navigation.navigate('Summary', {
				bankDetail,
			});

			//props.updateKycFormData({ ...props.kycForm, bankDetail });
		}
	};

	const updateShowBirthDay = () => {
		setShowBirthDay(true);
	};
	const updateWrapper = () => {
		props.updateKycFormData({ ...props.kycForm, fileData });
	};

	let fetchBankList = () => {
		getBankList(true)
			.then((data) => {
				setBankList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		fetchBankList();
	}, []);

	let initializedData = () => {
		console.log(props.kycForm.bankDetail, 'bank details 1');
		//setBankDetail(props.kycForm.bankDetail);
		setBankDetail((prev) => ({ ...prev, ...props.kycForm.bankDetail }));
	};

	useFocusEffect(
		React.useCallback(() => {
			initializedData();
			updateWrapper();
		}, [props.kycForm.bankDetail])
	);

	return (
		<Bgcover name='KYC Form'>
			<StepIndicator currentPosition={2} />
			<ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
				<KycHeader text='Bank Details' />
				<Dropdown
					//fontSize={14}
					value={bankDetail.bankName}
					placeholder='Bank Name'
					inputContainerStyle={{
						borderBottomColor: colors.primary,
						borderBottomWidth: 1.5,
					}}
					onChangeText={(value, code) => {
						let bank = bankList.find((i) => value === i.name);
						console.log(bank, 'bank');
						if (bankDetail.accountNo.length === 10) {
							getAccountDetail(bank.code, bankDetail.accountNo);
						} else {
							setBankDetail((prev) => ({ ...prev, accountName: '' }));
						}

						setBankDetail((prev) => ({
							...prev,
							bankName: value,
							bankCode: bank.code,
						}));
					}}
					data={bankList.map((i) => ({
						label: i.name,
						value: i.name,
					}))}
				/>
				{showError && bankDetail.bankName.length < 3 && (
					<GeneralError errorMsg='required' />
				)}

				<UnderLineInput
					onChangeText={(val) => {
						setBankDetail((prev) => ({ ...prev, accountNo: val }));
						if (val.length === 10 && bankDetail.bankCode.length > 2) {
							getAccountDetail(bankDetail.bankCode, val);
						} else {
							setBankDetail((prev) => ({ ...prev, accountName: '' }));
						}
					}}
					keyboardType='number-pad'
					placeholder='Account Number'
					value={bankDetail.accountNo}
					error={showError && bankDetail.accountNo.length !== 10 ? true : false}
				/>
				{bankDetail.accountName.length > 0 && (
					<UnderLineInput
						value={bankDetail.accountName}
						placeholder='Account Name'
						editable={true}
						// error={
						// 	showError && bankDetail.accountName.length < 5 ? true : false
						// }
					/>
				)}

				<KycHeader text='Employment  details' />
				<Dropdown
					fontSize={14}
					value={bankDetail.employmentStatus}
					placeholder='Employment status'
					inputContainerStyle={{
						borderBottomColor: colors.primary,
						borderBottomWidth: 1.5,
					}}
					onChangeText={(value) => {
						setBankDetail((prev) => ({ ...prev, employmentStatus: value }));
					}}
					data={['employed', 'un-employed', 'student', 'self-employed'].map(
						(i) => ({ label: i.toLocaleUpperCase(), value: i })
					)}
				/>
				{showError && bankDetail.employmentStatus.length < 5 && (
					<GeneralError errorMsg='required' />
				)}
				{bankDetail.employmentStatus === 'employed' && (
					<>
						<UnderLineInput
							value={bankDetail.natureOfBusiness}
							onChangeText={(val) => {
								setBankDetail((prev) => ({ ...prev, natureOfBusiness: val }));
							}}
							placeholder='Nature of Business / Occupation'
							error={
								showError && bankDetail.natureOfBusiness.length < 4
									? true
									: false
							}
						/>
						<UnderLineInput
							value={bankDetail.employerName}
							onChangeText={(val) => {
								setBankDetail((prev) => ({ ...prev, employerName: val }));
							}}
							placeholder='Employer Name'
							error={
								showError && bankDetail.employerName.length < 4 ? true : false
							}
						/>
						<UnderLineInput
							value={bankDetail.employerAddress}
							onChangeText={(val) => {
								setBankDetail((prev) => ({ ...prev, employerAddress: val }));
							}}
							placeholder='Employer Address'
							error={
								showError && bankDetail.employerAddress.length < 5
									? true
									: false
							}
						/>
					</>
				)}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 20,
						bottom: 0,
						width: '100%',
					}}
				>
					<Back
						onPress={() => {
							setBankDetail((prev) => ({
								...prev,
								...props.kycForm.bankDetail,
							}));
							props.navigation.goBack();
						}}
					/>
					<Next onPress={() => handleNext()} />
				</View>
			</ScrollView>
		</Bgcover>
	);
};
const mapStateToProps = (state) => {
	return {
		userData: state.normal.userData,
		kycForm: state.kyc.form,
		kycStatus: state.kyc.status,
		kycRejectMessage: state.kyc.rejectMessage,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		updateKycFormData: (data) => {
			dispatch(updateKycFormData(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
