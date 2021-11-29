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
import { useRoute } from '@react-navigation/native';
import KycHeader from '../../Component/Header/KycHeader';
import SummaryCard from '../../Component/SummaryCard';
import moment from 'moment';
import StepIndicatorComponent from '../../Component/StepIndicator/indicator';
import Back from '../../Component/Back';
import { styles } from '../../Styles/globalStyles';
import { submitKyc } from '../../Api/kycApi';
import { imageUrl } from '../../Api/axios';
import {
	updateKycFormData,
	updateKycNoteModal,
} from '../../Redux/actionCreator';

const Summary = (props) => {
	const { bankDetail } = useRoute().params;
	const { fileData, personalDetailsData } = props.kycForm;

	const updateWrapper = () => {
		props.updateKycFormData({ ...props.kycForm, bankDetail });
	};

	useEffect(() => {
		updateWrapper();
	}, [bankDetail]);
	const handleSubmit = () => {
		console.log(
			{
				uri: fileData.passport.uri,
				type: fileData.passport.type,
				name: fileData.passport.fileName,
			},
			'fill data',
			personalDetailsData.mmm,
			'ooo'
		);
		let payload = new FormData();
		payload.append('title', personalDetailsData.title);
		if (personalDetailsData.middleName)
			payload.append('middle_name', personalDetailsData.middleName);
		if (personalDetailsData.secondPhone)
			payload.append('second_phone', personalDetailsData.secondPhone);
		payload.append('dob', new Date(personalDetailsData.dob).toISOString());
		payload.append('state_of_origin', personalDetailsData.stateOfOrigin);
		payload.append('lga_of_origin', personalDetailsData.lgaOfOrigin);
		if (personalDetailsData.mmm) payload.append('mmn', personalDetailsData.mmm);
		payload.append('home_address', personalDetailsData.homeAddress);
		payload.append('id_type', personalDetailsData.idType);
		if (typeof personalDetailsData.idFile === 'string') {
			//	payload.append('id_file', personalDetailsData.idFile);
		} else {
			payload.append('id_file', {
				uri: personalDetailsData.idFile.uri,
				type: personalDetailsData.idFile.type,
				name: personalDetailsData.idFile.fileName,
			});
		}

		payload.append('id_number', personalDetailsData.idNumber);
		payload.append('utility_bill_type', fileData.utilityBillType);

		if (typeof fileData.utilityBill === 'string') {
			//	payload.append('utility_bill', fileData.utilityBill);
		} else {
			payload.append('utility_bill', {
				uri: fileData.utilityBill.uri,
				type: fileData.utilityBill.type,
				name: fileData.utilityBill.fileName,
			});
		}

		if (typeof fileData.passport === 'string') {
			//	payload.append('passport', fileData.passport);
		} else {
			payload.append('passport', {
				uri: fileData.passport.uri,
				type: fileData.passport.type,
				name: fileData.passport.fileName,
			});
		}

		payload.append('next_of_kin_full_name', personalDetailsData.NK_fullName);

		payload.append(
			'next_of_kin_relationship',
			personalDetailsData.NK_relationship
		);
		payload.append('next_of_kin_phone', personalDetailsData.NK_phone);
		payload.append('next_of_kin_email', personalDetailsData.NK_email);
		payload.append(
			'next_of_kin_nationality',
			personalDetailsData.NK_nationality
		);
		if (personalDetailsData.bvn) {
			payload.append('bank_details_bvn', personalDetailsData.bvn);
		}
		payload.append('bank_details_bank_name', bankDetail.bankName);
		payload.append('bank_details_account_name', bankDetail.accountName);
		payload.append('bank_details_account_number', bankDetail.accountNo);
		payload.append('employment_details_status', bankDetail.employmentStatus);
		payload.append(
			'employment_details_occupation',
			bankDetail.natureOfBusiness
		);
		payload.append('employment_details_employer_name', bankDetail.employerName);
		payload.append(
			'employment_details_employer_address',
			bankDetail.employerAddress
		);
		payload.append(
			'employment_details_nature_of_business',
			bankDetail.natureOfBusiness
		);
		payload.append('given_tent', fileData.tent == true ? 1 : 0);
		payload.append('given_cart', fileData.cart == true ? 1 : 0);

		submitKyc(payload)
			.then((data) => {
				props.navigation.navigate('SubmitPage');
			})
			.catch((error) => {
				console.log('error');
				//  props.navigation.navigate('SubmitPage');
				Alert.alert('Error', error.response?.data.error);
			});
	};

	return (
		<Bgcover name='Summary'>
			<StepIndicatorComponent currentPosition={3} />
			<ScrollView contentContainerStyle={{ marginHorizontal: 10 }}>
				<View style={{ marginTop: 10 }} />
				<KycHeader text='Personal Details' />
				<View style={{ marginTop: 10 }} />
				<SummaryCard name='Title' value={personalDetailsData.title} />
				<SummaryCard
					name='Middle Name'
					value={personalDetailsData.middleName}
				/>
				<SummaryCard
					name='Second Phone'
					value={personalDetailsData.secondPhone}
				/>
				<SummaryCard
					name='Date of Birth'
					value={moment(personalDetailsData.dob).format('DD/MM/YYYY')}
				/>
				<SummaryCard name='BVN' value={personalDetailsData.bvn} />
				<SummaryCard
					name='State of Origin'
					value={personalDetailsData.stateOfOrigin}
				/>
				<SummaryCard
					name='LGA of Origin'
					value={personalDetailsData.stateOfOrigin}
				/>
				<SummaryCard name='Maiden ' value={personalDetailsData.mmm} />
				<SummaryCard
					name='Home Address'
					value={personalDetailsData.homeAddress}
				/>
				<SummaryCard name='ID Type' value={personalDetailsData.idType} />
				<SummaryCard
					name={personalDetailsData.idType.toUpperCase()}
					//image={personalDetailsData.idFile}
					image={
						typeof personalDetailsData.idFile === 'string' &&
						personalDetailsData.idFile.length > 0
							? `${imageUrl}/storage/kyc_files/${personalDetailsData.idFile}`
							: personalDetailsData.idFile.uri
					}
				/>
				<SummaryCard name='ID Number' value={personalDetailsData.idNumber} />
				<SummaryCard
					name='Out Let Address'
					value={personalDetailsData.outLetAddress}
				/>
				<KycHeader text='Next of Kin' />
				<View style={{ marginTop: 10 }} />
				<SummaryCard name='Full Name' value={personalDetailsData.NK_fullName} />
				<SummaryCard
					name='Nationality'
					value={personalDetailsData.NK_nationality}
				/>
				<SummaryCard
					name='Relationship'
					value={personalDetailsData.NK_relationship}
				/>
				<SummaryCard name='Phone' value={personalDetailsData.NK_phone} />
				<KycHeader text='File and Utility' />
				<View style={{ marginTop: 10 }} />
				<SummaryCard
					name='Utility Bill Type'
					value={fileData.utilityBillType}
				/>
				<SummaryCard
					name={fileData.utilityBillType.toUpperCase()}
					image={
						typeof fileData.utilityBill === 'string' &&
						fileData.utilityBill.length > 0
							? `${imageUrl}/storage/kyc_files/${fileData.utilityBill}`
							: fileData.utilityBill.uri
					}
				/>
				<SummaryCard
					name='Passport'
					image={
						typeof fileData.passport === 'string' &&
						fileData.passport.length > 0
							? `${imageUrl}/storage/kyc_files/${fileData.passport}`
							: fileData.passport.uri
					}
				/>
				<SummaryCard name='Cart' value={fileData.cart ? 'Accept' : 'Reject'} />
				<SummaryCard name='Tent' value={fileData.tent ? 'Accept' : 'Reject'} />
				<KycHeader text='Bank' />
				<SummaryCard name='Bank Name' value={bankDetail.bankName} />
				<SummaryCard name='Account No' value={bankDetail.accountNo} />
				<SummaryCard name='Account Name' value={bankDetail.accountName} />
				<SummaryCard
					name='Employment Status'
					value={bankDetail.employmentStatus}
				/>
				<SummaryCard
					name='Nature Of Business'
					value={bankDetail.natureOfBusiness}
				/>
				<SummaryCard name='Employment Name' value={bankDetail.employerName} />
				<SummaryCard
					name='Employment Address'
					value={bankDetail.employerAddress}
				/>
				<TouchableOpacity
					style={styles.submit}
					onPress={() => {
						handleSubmit();
					}}
				>
					<Text
						style={{
							fontSize: 18,
							fontWeight: 'bold',
							color: 'white',
							textAlign: 'center',
						}}
					>
						Submit
					</Text>
				</TouchableOpacity>

				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 20,
						bottom: 0,
						width: '100%',
					}}
				>
					<Back onPress={props.navigation.goBack} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
