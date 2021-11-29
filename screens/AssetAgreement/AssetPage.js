import React, { useState } from 'react';
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

import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../Styles/colors';
import { styles } from '../../Styles/globalStyles';
import FileUploadUi from '../../Component/Upload/FileUpload';
import { PagesName } from './constant';
import StepIndicator from '../../Component/StepIndicator/indicator';
import Next from '../../Component/Next';
import Back from '../../Component/Back';
import KycHeader from '../../Component/Header/KycHeader';
import AssetHeader from '../../Component/Header/AssetHeader';
import AssetText from '../../Component/AssetText';
import { useEffect } from 'react';
import { agreeToAsset, getSingleUserKyc } from '../../Api/kycApi';

const LIST = [
	{
		header: ' PLEASE FIND BELOW TERMS AND CONDITIONS (“TERMS”).',
		body: 'This Agreement shall be governed by, and construed in accordance with,the laws of the Federal Republic of Nigeria. Access to, and use of  Scrapays services (“Services”),and the Scrapays website and other resources (such as mobiles apps, USSD, IOT devices etc.,), including any of its content, is conditional on your agreement to these Terms. By registering, or by using Scrapays, you are bound to these Terms and you indicate your continued acceptance of these Terms. If you take assets as startup loan with Scrapays, you thereby authorize Scrapays Technologies Limited to debit your wallet for all fees associated to the loan as soon as the items is disbursed as contained herein.Irrevocably undertake and covenant that you shall at all times make funds available in your wallet for the purpose of meeting you obligations as and when due. The foregoing shall be construed as a continuing instruction and shall not be revoked by you until you have fully paid down the facility availed to you.',
	},
	{
		header: 'TERMS',
		body: 'SCRAPAYS TECHNOLOGIES LIMITED may collect, use and disclose your transaction information from/to the appointed Credit Bureaus and other agencies whom may use the information for any approved business  purposes as may from time to time be prescribed by any relevant statute.',
	},
	{
		header: 'CONDITIONS',
		body: ' All expenses incurred in the arrangement, documentation and enforcement of payments under this facility would be borne by the Borrower.  The facility shall terminate and all sums due to Scrapays there under shall become immediately due and payable if the borrower commits any breach or defaults under the terms of the facility granted him by Scrapays or any other institutional lender. Account must revert to credit on or before expiration;  Any outstanding unpaid rental at expiration or any excess above the limit is not to be considered as approval for the unpaid obligation or unauthorized excess and will attract interest at 1% flat monthly',
	},
	{
		header: 'EVENTS OF DEFAULT',
		body: 'Without prejudice to Scrapays’ right to demand repayment of outstanding amounts under the facility at any time, the occurrence of any of the following events shall cause all outstanding amounts under this facility to become immediately repayable.  If the borrower fails to settle any due obligation arising from the facility; or If the borrower defaults in the performance or the observance of any other term, after notice might have been given to the borrower or If an order is made or an effective resolution is passed or a petition is presented for the borrower’s undertaking and assets; or If a distress or execution is levied upon or issued against the borrower’s property and is not discharged within 5 days;',
	},
	{
		header: 'RIGHT OF SET-OFF',
		body: 'The borrower covenants and agrees that Scrapays can use third party services in addition to any general lien or similar right to which Scrapays may be entitled by law, Scrapays in association with such services may at any time and without notice to the borrower combine or consolidate all or any of the [his/her] accounts with any liabilities to Scrapays and set off or transfer any sum or sums standing to the credit of one or more of such accounts in or towards satisfaction of any of the borrower’s liabilities to Scrapays or any other account in any other respect whether such liabilities be actual or contingent, primary, or collective and several or joint.',
	},
	{
		header: 'DEFAULT CLAUSE/ PENAL RATE',
		body: 'Any excess drawing over the approved facility limit and/or failure to meet agreed repayment terms will attract a penalty fee of 1% flat of the amount per month whether or not such excess over approved limit and/or failure to meet repayment terms is for a period less than one month.',
	},
	{
		header: 'GLOBAL STANDING INSTRUCTION MANDATE',
		body: 'By signing this agreement and by taking the assets, you covenant to repay the accompanied liability accrued as and when due.In the event that you fail to repay the facility as agreed, and the facility becomes delinquent, Scrapays shall have the right to report the delinquent facility to the Credit Risk Management System (CRMS) or by any other means, and request the it to exercise its regulatory power to direct all banks and other financial institutions under its regulatory purview to set-off your indebtedness from any money standing to your credit in any bank account and from any other financial assets they may be holding for your benefit. You covenant and warrant that Scrapays shall have power to set-off your indebtedness under this facility agreement from all such monies and funds standing to your credit/benefit in any and all such accounts. You hereby waive any right of confidentiality whether arising under common law or statute or in any other manner whatsoever and irrevocably agree that you shall not argue to the contrary before any court of law, tribunal, administrative authority or any other body acting in any judicial or quasi-judicial capacity. ',
	},
	{
		header: 'SEVERABILITY',
		body: 'The unenforceability or invalidity of any clause in this Agreement shall not have an impaction the enforceability or validity of any other clause. Any unenforceable or invalid clause shall be regarded as removed from this Agreement to the extent of its unenforceability and invalidity. Therefore, this Agreement shall be interpreted and enforced as if it did not contain the said clause to the extent of its unenforceability and invalidity.',
	},
	{
		header: 'ENTIRE AGREEMENT',
		body: 'This Agreement contains all the terms agreed to by the Borrower and Lender relating to its subject matter, including any attachments or addendums. This Agreement replaces all previous discussions, understandings, and oral agreements.',
	},
	{
		header: '',
		body: 'We are pleased to have been given the opportunity to be of service to you and look forward to a mutually beneficial relationship in the future.',
	},
	{
		header: '',
		body: 'IN WITNESS WHEREOF, the Parties have executed this Agreement as of the undersigned dates written below. ',
	},
];

const mapStateToProps = (state) => {
	return {
		userData: state.normal.userData,
	};
};

const AssetPage = (props) => {
	const [signData, setSignData] = useState({ firstName: '', lastName: '' });

	let todayDate = new Date().toLocaleDateString();
	let fullName = props.userData.first_name + ' ' + props.userData.last_name;
	let [userKycDetails, setUserKycDetails] = useState({});

	let handleSigning = async () => {
		if (
			props.userData.last_name.toLowerCase() ===
				signData.lastName.toLocaleLowerCase() &&
			props.userData.first_name.toLowerCase() ===
				signData.firstName.toLowerCase()
		) {
			try {
				let response = await agreeToAsset();
			} catch (error) {
				Alert.alert('Error', error.response?.data.error);
			}
		} else {
			Alert.alert('Info', 'please enter your correct first name and last name');
		}
	};

	let getUserKycDetails = async () => {
		try {
			let response = await getSingleUserKyc();
			console.log(response.data, 'response data');
			setUserKycDetails(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getUserKycDetails();
	}, []);

	return (
		<Bgcover name='Asset Repayment Agreement' hideSideBar={true}>
			<ScrollView contentContainerStyle={{ marginHorizontal: 20 }}>
				<Text style={{ fontSize: 16, lineHeight: 22, textAlign: 'justify' }}>
					<Text style={{ fontWeight: 'bold' }}>
						{' '}
						This ASSET REPAYMENT AGREEMENT (“Agreement”)
					</Text>{' '}
					dated <Text>{todayDate}</Text> BETWEEN SCRAPAYS TECHNOLOGIES LIMITED
					of 2, Omoniyi Street, Shangisha Magodo Lagos. (the “Lender”) AND{' '}
					<Text>{fullName}</Text> of (Cutsomer address) (the “Borrower”)
					HEREINAFTER, both the Lender and Borrower (“Parties”) agrees to the
					following: At the time of this Agreement, the borrower received the
					under listed materials as “startup loan” from the lender
				</Text>
				<View style={{ marginTop: 10 }} />
				<Text style={{ fontSize: 16, lineHeight: 22 }}>1. 300kg IOT Scale</Text>

				{userKycDetails.given_tent ? (
					<Text style={{ fontSize: 16, lineHeight: 22 }}>
						2.14*12*9ft Covered tent with wooden pallets
					</Text>
				) : null}
				{userKycDetails.given_cart ? (
					<Text style={{ fontSize: 16, lineHeight: 22 }}>
						{userKycDetails.given_tent ? 3 : 2} .150kg capacity cargo bicycle
					</Text>
				) : null}

				<View style={{ marginTop: 10 }} />
				<Text style={{ fontWeight: 'bold', fontSize: 18 }}>REPAYMENT</Text>
				<View style={{ marginTop: 10 }} />
				<Text style={{ fontSize: 16, lineHeight: 22, textAlign: 'justify' }}>
					Repayment is calculated by the choice of asset the borrower opts to
					get. Below is a list of available asset and corresponding monthly
					repayment based on a 12 months tenure.
				</Text>
				<View style={{ marginTop: 10 }} />
				<Text style={{ fontSize: 16, lineHeight: 22, textAlign: 'justify' }}>
					1. 300kg IOT Scale; Rate NGN4,133.33 monthly | NGN49,600 Total Amount
					to be repaid.
				</Text>
				{userKycDetails.given_tent ? (
					<Text style={{ fontSize: 16, lineHeight: 22 }}>
						{' '}
						2. 14*12*9ft Covered tent with wooden pallets; Rate NGN15,500
						monthly | 186,000 Total Amount to be repaid.
					</Text>
				) : null}

				{userKycDetails.given_cart ? (
					<Text style={{ fontSize: 16, lineHeight: 22 }}>
						{' '}
						{userKycDetails.given_tent ? '3' : 2}. 150kg capacity cargo bicycle;
						Rate 7,233.33 monthly | 86,800 Total Amount to be repaid.
					</Text>
				) : null}
				{LIST.map((i) => (
					<AssetText header={i.header} body={i.body} />
				))}
				<Text
					style={{
						fontSize: 16,
						lineHeight: 22,
						fontWeight: 'bold',
						marginTop: 10,
					}}
				>
					{todayDate}
				</Text>

				<Text style={{ fontSize: 16, lineHeight: 22, marginTop: 10 }}>
					Please input your first name and last name to agree to the agreement
					above
				</Text>

				<UnderLineInput
					onChangeText={(val) => {
						setSignData((prev) => ({ ...prev, firstName: val }));
					}}
					placeholder='First Name'
					value={signData.firstName}
				/>

				<UnderLineInput
					onChangeText={(val) => {
						setSignData((prev) => ({ ...prev, lastName: val }));
					}}
					placeholder='Last Name'
					value={signData.lastName}
				/>

				<TouchableOpacity
					onPress={() => {
						handleSigning();
					}}
					style={[
						styles.submit,
						{ backgroundColor: colors.primary, marginBottom: 20 },
					]}
				>
					<Text
						style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}
					>
						Sign Agreement{' '}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</Bgcover>
	);
};

export default connect(mapStateToProps)(AssetPage);
