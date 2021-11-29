import React, { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
	BackHandler,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import Bgcover from '../../Component/Bg/BackgroundCover';
import { Dropdown } from 'react-native-material-dropdown';
import UnderLineInput from '../../Component/input/UnderlineInput';
import DateTimePicker from '@react-native-community/datetimepicker';

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../Styles/colors';
import { styles } from '../../Styles/globalStyles';
import FileUploadUi from '../../Component/Upload/FileUpload';
import { PagesName } from './constant';
import StepIndicator from '../../Component/StepIndicator/indicator';
import Next from '../../Component/Next';
import KycHeader from '../../Component/Header/KycHeader';
import { AllCountry, ALLSTATE } from '../../utils/constant';
import { useEffect } from 'react';
import moment from 'moment';
import GeneralError from '../../Component/Error/GeneralError';
import { updateLoggedIn, updateKycFormData } from '../../Redux/actionCreator';
import { getSinglePickup } from '../../Api/api';
import { getSingleUserKyc } from '../../Api/kycApi';
import { imageUrl } from '../../Api/axios';
import { useFocusEffect } from '@react-navigation/native';

const PersonalDetails = (props) => {
	const [showBirthDay, setShowBirthDay] = useState(false);
	const [date, setDate] = useState(new Date(1598051730000));
	const [personalDetailsData, setPersonalDetailsData] = useState({
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
	});

	const [show, setShow] = useState(false);
	const [currentLocal, setCurrentLocal] = useState([]);
	const [showError, setShowError] = useState(false);
	const handleNext = () => {
		//	return props.navigation.navigate('FileUpload', personalDetailsData);

		let {
			title,
			middleName,
			secondPhone,
			dob,
			bvn,
			stateOfOrigin,
			lgaOfOrigin,
			mmm,
			homeAddress,
			idType,
			idFile,
			idNumber,
			outLetAddress,
			NK_email,
			NK_fullName,
			NK_nationality,
			NK_relationship,
			NK_phone,
		} = personalDetailsData;
		if (
			title.length < 1 ||
			!dob ||
			stateOfOrigin.length < 3 ||
			lgaOfOrigin.length < 2 ||
			mmm.length < 3 ||
			homeAddress.length < 3 ||
			idType.length < 2 ||
			//!idFile ||
			idNumber.length === 0 ||
			NK_fullName.length < 4 ||
			NK_nationality.length < 3 ||
			NK_relationship.length < 3 ||
			NK_phone.length !== 11
		) {
			setShowError(true);
			Alert.alert('Info', 'please fill the required field');
		} else {
			props.updateKycFormData({ ...props.kycForm, personalDetailsData });
			props.navigation.navigate('FileUpload', personalDetailsData);
		}
	};

	let fetchKycDetails = () => {
		getSingleUserKyc(true)
			.then((data) => {
				//initializedData();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		if (personalDetailsData.stateOfOrigin) {
			let local = ALLSTATE.find(
				(i) => i.state.name === personalDetailsData.stateOfOrigin
			);
			setCurrentLocal(local.state.locals);
		}
	}, [personalDetailsData.stateOfOrigin]);

	function handleBackButtonClick() {
		if (props.navigation.canGoBack()) {
			props.navigation.goBack();
		} else {
			props.updateLoggedIn(false);
		}

		return true;
	}

	useEffect(() => {
		fetchKycDetails();
		BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
		return () => {
			BackHandler.removeEventListener(
				'hardwareBackPress',
				handleBackButtonClick
			);
		};
	}, []);

	const updateShowBirthDay = () => {
		setShowBirthDay(true);
	};

	const initializedData = () => {
		console.log(props.kycForm.personalDetailsData, 'kyc form');
		setPersonalDetailsData((prev) => ({
			...prev,
			...props.kycForm.personalDetailsData,
		}));
	};

	// useEffect(() => {
	// 	const unsubscribe = props.navigation.addListener('focus', () => {
	// 		console.log(new Date() ,"running")
	// 		initializedData();
	// 	});
	// 	// Return the function to unsubscribe from the event so it gets removed on unmount
	// 	return unsubscribe;
	// }, []);

	useEffect(() => {
		console.log(props.kycRejectMessage, 'message');
		if (props.kycStatus === 'rejected' && props.kycRejectMessage.length > 0) {
			initializedData();
			Alert.alert(
				'Info',
				`Your KYC details was rejected due to the following reason(s) \n${props.kycRejectMessage}`
			);
		}
	}, [props.kycRejectMessage]);

	useFocusEffect(
		React.useCallback(() => {
			console.log('in personal details');
			initializedData();
		}, [props.kycForm.personalDetailsData])
	);

	return (
		<Bgcover name='KYC Form'>
			<StepIndicator currentPosition={0} />
			<ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
				<View style={{ marginVertical: 10 }} />
				<KycHeader text='Personal Details' />
				<Dropdown
					value={personalDetailsData.title}
					fontSize={10}
					placeholder='Title'
					inputContainerStyle={{
						borderBottomColor: colors.primary,
						borderBottomWidth: 1.5,
					}}
					onChangeText={(value) => {
						setPersonalDetailsData((prev) => ({ ...prev, title: value }));
					}}
					data={[
						{
							label: 'Mr',
							value: 'Mr',
							color: 'black',
						},
						{
							label: 'Mrs',
							value: 'Mrs',
							color: 'black',
						},
						{
							label: 'Miss',
							value: 'Miss',
							color: 'black',
						},
					]}
				/>
				{showError && personalDetailsData.title.length < 1 && (
					<GeneralError errorMsg='required' />
				)}
				<UnderLineInput
					editable={true}
					value={props.userData.first_name}
					placeholder='First Name'
				/>
				<UnderLineInput
					editable={true}
					value={props.userData.last_name}
					placeholder='Last Name'
				/>
				<UnderLineInput
					value={personalDetailsData.middleName}
					placeholder='Middle Name'
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, middleName: val }));
					}}
				/>
				<UnderLineInput
					editable={true}
					keyboardType='phone-pad'
					editable={true}
					value={props.userData.phone}
					placeholder='Phone number 1'
				/>
				<UnderLineInput
					value={personalDetailsData.secondPhone}
					keyboardType='phone-pad'
					placeholder='Phone number 2'
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, secondPhone: val }));
					}}
				/>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '100%',
						alignItems: 'flex-end',
						marginTop: 20,
					}}
				>
					<TouchableOpacity
						onPress={() => {
							updateShowBirthDay();
						}}
						style={{
							borderBottomColor: colors.primary,
							borderBottomWidth: 1,
							width: '100%',
							//	alignItems: 'center',
							justifyContent: 'flex-end',
							paddingBottom: 6,
						}}
					>
						<Text style={{}}>
							{' '}
							{personalDetailsData.dob
								? `${moment(date).format('DD/MM/YYYY')}`
								: 'Date of Birth: dd / mm / yyyy'}
						</Text>
					</TouchableOpacity>

					<View style={{ width: '40%' }}>
						{/* <Dropdown
              placeholder="Sex"
              dropdownOffset={{top: 0, left: 0}}
              inputContainerStyle={{
                borderBottomColor: '#F18921',
                borderBottomWidth: 1.5,
                //  backgroundColor: 'green',
              }}
              containerStyle={
                {
                  //  backgroundColor: 'red',
                }
              }
              onChangeText={value => {}}
              data={[
                {label: 'Male', value: 'male', color: 'black'},
                {label: 'Female', value: 'female', color: 'black'},
              ]}
            /> */}
					</View>
				</View>
				{showError && !personalDetailsData.dob && (
					<GeneralError errorMsg='required' />
				)}
				<Dropdown
					placeholder='State of Origin'
					value={personalDetailsData.stateOfOrigin}
					inputContainerStyle={{
						borderBottomColor: '#F18921',
						borderBottomWidth: 1.5,
						//  backgroundColor: 'green',
					}}
					containerStyle={
						{
							//  backgroundColor: 'red',
						}
					}
					data={ALLSTATE.map((i) => ({
						label: i.state.name,
						value: i.state.name,
					}))}
					onChangeText={(value) => {
						setPersonalDetailsData((prev) => ({
							...prev,
							stateOfOrigin: value,
						}));
					}}
				/>
				{showError && personalDetailsData.stateOfOrigin.length < 2 && (
					<GeneralError errorMsg='required' />
				)}
				<Dropdown
					placeholder='Local government'
					value={personalDetailsData.lgaOfOrigin}
					inputContainerStyle={{
						borderBottomColor: '#F18921',
						borderBottomWidth: 1.5,
					}}
					onChangeText={(value) => {}}
					data={currentLocal.map((i) => ({ label: i.name, value: i.name }))}
					onChangeText={(value) => {
						setPersonalDetailsData((prev) => ({ ...prev, lgaOfOrigin: value }));
					}}
				/>
				{showError && personalDetailsData.lgaOfOrigin.length < 2 && (
					<GeneralError errorMsg='required' />
				)}
				<UnderLineInput
					value={personalDetailsData.mmm}
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, mmm: val }));
					}}
					placeholder='Mother’s Maiden Name'
					error={showError && personalDetailsData.mmm.length < 1 ? true : false}
				/>

				<UnderLineInput
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, bvn: val }));
					}}
					keyboardType='number-pad'
					placeholder='BVN'
					value={personalDetailsData.bvn}
					onFocus={() => {
						if (true) {
							Alert.alert(
								'Alert',
								'BVN verification is not mandatory for new accounts.\n \n Note: Accounts without BVN will have transactions caped at #50,000.'
							);
							//  setFirstTimeOnBvn(true);
						}
					}}
				/>

				<UnderLineInput
					editable={true}
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, homeAddress: val }));
					}}
					placeholder='Home address'
					error={showError && personalDetailsData.homeAddress.length < 3}
					value={personalDetailsData.homeAddress}
				/>

				<UnderLineInput
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, outLetAddress: val }));
					}}
					placeholder='Outlet Address (if different from Home Address)'
					value={personalDetailsData.outLetAddress}
				/>
				<Dropdown
					placeholder='Means of identification '
					value={personalDetailsData.idType}
					inputContainerStyle={{
						borderBottomColor: '#F18921',
						borderBottomWidth: 1.5,
					}}
					onChangeText={(value) => {
						setPersonalDetailsData((prev) => ({ ...prev, idType: value }));
					}}
					data={['nin', 'driver', 'voters-card'].map((i) => ({
						label: i.toLocaleUpperCase(),
						value: i,
					}))}
				/>
				{showError && personalDetailsData.idType.length < 2 && (
					<GeneralError errorMsg='required' />
				)}
				<FileUploadUi
					changeFunc={(res) =>
						setPersonalDetailsData((prev) => ({ ...prev, idFile: res }))
					}
					error={showError && !personalDetailsData.idFile ? true : false}
					textName='Upload ID'
					uri={
						typeof personalDetailsData.idFile === 'string' &&
						personalDetailsData.idFile.length > 0
							? `${imageUrl}/storage/kyc_files/${personalDetailsData.idFile}`
							: false
					}
				/>

				<UnderLineInput
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, idNumber: val }));
					}}
					placeholder='ID Number'
					value={personalDetailsData.idNumber}
					error={
						showError && personalDetailsData.idNumber.length === 0
							? true
							: false
					}
				/>

				<View style={{ marginVertical: 10 }} />
				<KycHeader text='Next Of Kin' />
				<UnderLineInput
					value={personalDetailsData.NK_fullName}
					error={showError && personalDetailsData.NK_fullName.length < 4}
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, NK_fullName: val }));
					}}
					placeholder='Full Name (Next of Kin)'
				/>

				<UnderLineInput
					value={personalDetailsData.NK_relationship}
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({
							...prev,
							NK_relationship: val,
						}));
					}}
					placeholder='Relationship with next of kin'
					error={
						showError && personalDetailsData.NK_relationship.length < 3
							? true
							: false
					}
				/>

				<UnderLineInput
					value={personalDetailsData.NK_phone}
					keyboardType='phone-pad'
					placeholder='Phone Number (Next of Kin)'
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, NK_phone: val }));
					}}
					error={
						showError && personalDetailsData.NK_phone.length !== 11
							? true
							: false
					}
				/>

				<UnderLineInput
					onChangeText={(val) => {
						setPersonalDetailsData((prev) => ({ ...prev, NK_email: val }));
					}}
					placeholder='Email (Next of Kin)'
					value={personalDetailsData.NK_email}
				/>
				<Dropdown
					value={personalDetailsData.NK_nationality}
					placeholder='Nationality'
					dropdownOffset={{ top: 0, left: 0 }}
					inputContainerStyle={{
						borderBottomColor: '#F18921',
						borderBottomWidth: 1.5,
					}}
					containerStyle={{
						marginTop: 20,
					}}
					onChangeText={(value) => {
						setPersonalDetailsData((prev) => ({
							...prev,
							NK_nationality: value,
						}));
					}}
					data={AllCountry.map((i) => ({ label: i.name, value: i.name }))}
				/>
				{showError && personalDetailsData.NK_nationality.length < 3 && (
					<GeneralError errorMsg='required' />
				)}
				<Next onPress={() => handleNext()} />
				{showBirthDay && (
					<DateTimePicker
						testID='dateTimePicker'
						value={date}
						mode={'date'}
						is24Hour={true}
						display='default'
						onChange={(event, selectedDate) => {
							const currentDate = selectedDate.toISOString() || date;
							setShowBirthDay(false);
							setDate(selectedDate);
							//setPersonalDetailsData((prev) => ({ ...prev, dob: currentDate }));

							setPersonalDetailsData((prev) => ({
								...prev,
								dob: currentDate,
							}));

							console.log(event, selectedDate);
						}}
					/>
				)}
			</ScrollView>
		</Bgcover>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateLoggedIn: (state) => {
			dispatch(updateLoggedIn(state));
		},
		updateKycFormData: (data) => {
			dispatch(updateKycFormData(data));
		},
	};
};

const mapStateToProps = (state) => {
	return {
		userData: state.normal.userData,
		kycForm: state.kyc.form,
		kycStatus: state.kyc.status,
		kycRejectMessage: state.kyc.rejectMessage,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
