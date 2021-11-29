import React, { useState, useEffect, useRef } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
} from 'react-native';
import RadioForm, {
	RadioButton,
	RadioButtonInput,
	RadioButtonLabel,
} from 'react-native-simple-radio-button';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';
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
import StepIndicator from '../../Component/StepIndicator/indicator';
import Back from '../../Component/Back';
import Next from '../../Component/Next';
import { useRoute } from '@react-navigation/native';
import KycHeader from '../../Component/Header/KycHeader';
import GeneralError from '../../Component/Error/GeneralError';
import { imageUrl } from '../../Api/axios';
import { updateKycFormData } from '../../Redux/actionCreator';
import { isObjEmpty } from '../../utils/check';

const FileUpload = (props) => {
	const [showError, setShowError] = useState(true);
	const [fileData, setFileData] = useState({
		utilityBillType: '',
		utilityBill: {},
		passport: {},
		cart: false,
		tent: false,
	});
	let cartRef = useRef();
	let tentRef = useRef();

	let handleNext = () => {
		let { passport, utilityBill, utilityBillType } = fileData;
		console.log(
			!passport,
			!utilityBill,
			utilityBillType.length < 3,
			utilityBillType,
			'899'
		);
		if (
			isObjEmpty(passport) ||
			isObjEmpty(utilityBill) ||
			utilityBillType.length < 3
		) {
			setShowError(true);
			Alert.alert('Info', 'please fill the required field');
		} else {
			//props.updateKycFormData({ ...props.kycForm, fileData });
			props.navigation.navigate('BankDetails', { fileData });
			//props.navigation.goBack();
		}
	};

	let personalDetailsData = useRoute().params;
	console.log(personalDetailsData, 'Personal details');
	let radio_props = [
		{ label: 'Accept   ', value: true },
		{ label: 'Reject', value: false },
	];

	let initializedData = () => {
		console.log(props.kycForm.fileData, 'running');
		setFileData((prev) => ({ ...prev, ...props.kycForm.fileData }));

		cartRef.current.updateIsActiveIndex(
			props.kycForm.fileData.cart === true ? 0 : 1
		);
		tentRef.current.updateIsActiveIndex(
			props.kycForm.fileData.tent === true ? 0 : 1
		);
	};

	// useEffect(() => {
	// 	const unsubscribe = props.navigation.addListener('focus', () => {
	// 		initializedData();
	// 	});
	// 	// Return the function to unsubscribe from the event so it gets removed on unmount
	// 	return unsubscribe;
	// }, [props.navigation]);

	useFocusEffect(
		React.useCallback(() => {
			initializedData();
		}, [props.kycForm.fileData])
	);

	return (
		<Bgcover name='File Upload'>
			<ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
				<StepIndicator currentPosition={1} />
				<Dropdown
					value={fileData.utilityBillType}
					fontSize={15}
					placeholder='Utility Bill TYpe'
					inputContainerStyle={{
						borderBottomColor: colors.primary,
						borderBottomWidth: 1.5,
					}}
					onChangeText={(value) => {
						setFileData((prev) => ({ ...prev, utilityBillType: value }));
					}}
					data={[
						'nepa-bill',
						'waste-bill',
						'bank_statement',
						'water-bill',
					].map((i) => ({ label: i.toLocaleUpperCase(), value: i }))}
				/>
				{showError && fileData.utilityBillType.length < 2 && (
					<GeneralError errorMsg='required' />
				)}

				<FileUploadUi
					changeFunc={(res) =>
						setFileData((prev) => ({ ...prev, utilityBill: res }))
					}
					textName='Upload Utility Bill'
					error={showError && !fileData.utilityBill ? true : false}
					uri={
						typeof fileData.utilityBill === 'string' &&
						fileData.utilityBill.length > 0
							? `${imageUrl}/storage/kyc_files/${fileData.utilityBill}`
							: false
					}
				/>
				<View style={{ marginVertical: 10 }} />
				<FileUploadUi
					changeFunc={(res) =>
						setFileData((prev) => ({ ...prev, passport: res }))
					}
					textName='Passport Photograph'
					error={showError && !fileData.passport ? true : false}
					uri={
						typeof fileData.passport === 'string' &&
						fileData.passport.length > 0
							? `${imageUrl}/storage/kyc_files/${fileData.passport}`
							: false
					}
				/>
				<View style={{ marginVertical: 10 }} />
				<KycHeader text='Utility' />
				<Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
					Scale
				</Text>
				<Image
					source={require('../../assets/scale_new.png')}
					style={{ width: 100, height: 100, alignSelf: 'center' }}
				></Image>
				<Text style={{ fontSize: 12, textAlign: 'center' }}>Compulsory</Text>

				<Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
					Cart
				</Text>
				<Image
					source={require('../../assets/cart.jpg')}
					style={{ width: 100, height: 100, alignSelf: 'center' }}
				></Image>
				<View style={{ marginTop: 10, alignSelf: 'center' }}>
					<RadioForm
						ref={(r) => {
							cartRef.current = r;
						}}
						radio_props={radio_props}
						initial={-1}
						formHorizontal={true}
						buttonColor={'#F18921'}
						buttonInnerColor='#F18921'
						onPress={(value) => {
							if (typeof value === 'object') {
								setFileData((prev) => ({ ...prev, cart: value.value }));
							} else {
								setFileData((prev) => ({ ...prev, cart: value }));
							}
						}}
					/>
				</View>
				<Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
					Tent
				</Text>
				<Image
					source={require('../../assets/tent.jpg')}
					style={{ width: 100, height: 100, alignSelf: 'center' }}
				></Image>
				<View style={{ marginTop: 10, alignSelf: 'center' }}>
					<RadioForm
						radio_props={radio_props}
						ref={(r) => {
							tentRef.current = r;
						}}
						initial={-1}
						formHorizontal={true}
						buttonColor={'#F18921'}
						buttonInnerColor='#F18921'
						onPress={(value) => {
							console.log(value, 'tent value');
							if (typeof value === 'object') {
								setFileData((prev) => ({ ...prev, tent: value.value }));
							} else {
								setFileData((prev) => ({ ...prev, tent: value }));
							}
						}}
					/>
				</View>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 20,
					}}
				>
					<Back
						onPress={() => {
							props.updateKycFormData({ ...props.kycForm, fileData });
							props.navigation.goBack();
						}}
					/>
					<Next onPress={() => handleNext()} />
				</View>
			</ScrollView>
		</Bgcover>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
