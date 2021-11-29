import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Linking,
	TouchableOpacity,
	Image,
	ScrollView,
	Alert,
} from 'react-native';
import { height } from 'react-native-daterange-picker/src/modules';
import Modal from 'react-native-modal';
import { acceptPickUp, getAllNofification, getSinglePickup } from '../Api/api';
import { updatePickupAlertModal } from '../Redux/actionCreator';
import { store } from '../Redux/store';
import PickUpCard from './PickUpCard';
let dummyData = {
	id: 'E3VEKH',
	producer_id: '3Y4NUTYS5',
	assigned_collector: 'BRY9FYBDX',
	address: 'Abule',
	producer_name: 'philip shope',
	materials: [
		{
			material_name: 'Scrap Metal',
			material_type: 'Homogeneous',
			homogeneous_id: 0,
		},
	],
	homogeneous_id: null,
	composite_id: null,
	comment: null,
	description: null,
	schedule: {
		schedule_date: {
			day: '29',
			year: '2020',
			month: '10',
		},
		schedule_time: '10',
	},
	status: 'Pending',
	collector_accepted: 'accepted',
	location_id: 2,
	created_at: '2020-10-29T13:34:19.000000Z',
	updated_at: '2021-04-27T20:06:17.000000Z',
	deleted_at: null,
	producer: {
		id: '3Y4NUTYS5',
		first_name: 'Philip',
		last_name: 'Shope',
		phone: '07068137757',
		security_question_id: null,
		userable: null,
		location: null,
	},
	location: {
		id: 2,
		lat: '6.619804991',
		lng: '3.325793876',
	},
	homogeneous_materials: [
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
		{
			id: 6,
			name: 'Plastics (Chair)',
			price: 80,
			image: 'material-chair_1606818115.png',
			collector_commission: 8,
			pivot: {
				material_type: 'Homogeneous',
			},
		},
	],
	composite_materials: [],
};

const pickupAlertModal = (props) => {
	const [pickupData, setPickupData] = useState({});
	const [loading, setLoading] = useState(true);

	let getSinglePickupWrapper = async () => {
		setLoading(true);
		let pickUpState = store.getState().normal.pickupAlertModal;
		try {
			let pickUpId = pickUpState.id;
			let response = await getSinglePickup(pickUpId);
			console.log(response, ';;llkjjjj');
			setPickupData(response.data);
			if (response) setLoading(false);
		} catch (error) {
			Alert.alert('Error', error.response.data.error);
			console.log(error);
		}
	};
	let acceptWrapper = async () => {
		let id = pickupData.id;
		try {
			let response = await acceptPickUp(id);
			store.dispatch(updatePickupAlertModal({ status: false }));
			Alert.alert('Success', 'The pickup has been assign to you successfully');
		} catch (error) {
			console.log(error);
			Alert.alert('Error', error.response.data.error);
		}
	};

	useEffect(() => {
		getSinglePickupWrapper();
	}, []);

	return (
		<Modal
			onBackButtonPress={() => {
				store.dispatch(updatePickupAlertModal({ status: false }));
				console.log('ooolll');
			}}
			isVisible={true}
			style={styles.modal}
			animationInTiming={600}
		>
			{loading ? (
				<View>
					<Text style={styles.modalTitle}>Pickup Alert</Text>
				</View>
			) : (
				<View style={styles.modalContainer}>
					<Text style={styles.modalTitle}>Pickup Alert</Text>
					<ScrollView
						style={{ width: '100%' }}
						contentContainerStyle={{ width: '100%' }}
					>
						<View
							style={{
								width: '100%',
								justifyContent: 'space-between',
								flexDirection: 'row',
								paddingHorizontal: 10,
								marginBottom: 20,
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 20 }}>Name</Text>
							<Text style={{ width: '50%', fontSize: 20 }}>
								{`${pickupData.producer.first_name} ${pickupData.producer.last_name}`}
							</Text>
						</View>
						<View
							style={{
								width: '100%',
								justifyContent: 'space-between',
								flexDirection: 'row',
								paddingHorizontal: 10,
								marginBottom: 20,
							}}
						>
							<Text style={{ fontWeight: 'bold', fontSize: 16 }}>Address</Text>
							<Text style={{ width: '50%', fontSize: 16 }}>
								{pickupData.address}
							</Text>
						</View>
						<View
							style={{
								width: '100%',
								justifyContent: 'space-between',
								flexDirection: 'row',
								paddingHorizontal: 10,
								marginBottom: 20,
							}}
						>
							<Text
								style={{
									fontWeight: 'bold',
									fontSize: 16,
									alignSelf: 'center',
								}}
							>
								Phone
							</Text>
							<TouchableOpacity
								style={{ width: '50%' }}
								onPress={() => {
									Linking.openURL(`tel:${pickupData.producer.phone}`);
								}}
							>
								<Text
									style={{
										fontSize: 18,
										textDecorationStyle: 'solid',
										textDecorationLine: 'underline',
										color: '#EF7700',
										fontWeight: 'bold',
									}}
								>
									{pickupData.producer.phone}
								</Text>
							</TouchableOpacity>
						</View>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 20,
								alignSelf: 'flex-start',
								marginHorizontal: 10,
							}}
						>
							Materials
						</Text>
						<View
							style={{
								flexDirection: 'row',
								alignSelf: 'flex-start',
								//  maxWidth: '80%',
								flexWrap: 'wrap',
								marginHorizontal: 10,
							}}
						>
							{pickupData.homogeneous_materials.map((i, index) => {
								return (
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											width: '100%',
										}}
									>
										<Text
											key={index}
											style={{
												fontSize: 15,
												alignSelf: 'center',
											}}
										>
											{i.name}
										</Text>
										<Image
											source={{
												uri: `https://api.scrapays.com/storage/material_list_images/${i.image}`,
												width: 40,
												height: 40,
											}}
										></Image>
									</View>
								);
							})}
						</View>

						<View
							style={{
								flexDirection: 'row',
								alignSelf: 'flex-start',
								//  maxWidth: '80%',
								flexWrap: 'wrap',
								marginHorizontal: 10,
							}}
						>
							{pickupData.composite_materials.map((i, index) => {
								return (
									<View
										style={{
											flexDirection: 'row',
											justifyContent: 'space-between',
											width: '100%',
										}}
									>
										<Text
											key={index}
											style={{
												fontSize: 15,
												alignSelf: 'center',
											}}
										>
											{i.class}
										</Text>
										<Image
											source={{
												uri: `https://api.scrapays.com/storage/material_list_images/${i.image}`,
												width: 40,
												height: 40,
											}}
										></Image>
									</View>
								);
							})}
						</View>

						<TouchableOpacity
							onPress={() => {
								acceptWrapper();
							}}
							style={styles.button}
						>
							<Text style={styles.buttonText}>Accept</Text>
						</TouchableOpacity>
					</ScrollView>
				</View>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
		margin: 0,
		position: 'absolute',
		flex: 1,
		width: '100%',
		height: '100%',
		alignItems: 'center',
		paddingTop: 20,
	},
	modalContainer: {
		backgroundColor: '#fff',
		width: '90%',
		// paddingHorizontal: 16,
		//paddingTop: 20,
		paddingBottom: 40,
		alignItems: 'center',
		// marginHorizontal: 10,
		marginTop: 20,
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		width: '100%',
		backgroundColor: '#EF7700',
		color: 'white',
		textAlign: 'center',
		paddingVertical: 10,
	},
	modalText: {
		fontSize: 18,
		color: '#555',
		marginTop: 14,
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#0A956A',
		paddingVertical: 12,
		paddingHorizontal: 16,
		marginHorizontal: 20,

		alignItems: 'center',
		marginTop: 10,
		borderRadius: 10,
		alignSelf: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
	},
});

export default pickupAlertModal;
