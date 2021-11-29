import { Body } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MessageModal = (props) => {
	console.log(props.data);
	return (
		<Modal
			isVisible={props.showMessage}
			onBackButtonPress={props.handleModalBackButton}
			style={styles.modal}
			animationInTiming={600}
			backdropOpacity={0.5}
		>
			<View style={styles.modalContainer}>
				<TouchableOpacity
					style={{ alignSelf: 'flex-end' }}
					onPress={() => props.handleModalBackButton()}
				>
					<MaterialCommunityIcons name='close' size={20} color='gray' />
				</TouchableOpacity>
				<Text style={{ fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
					{props.data.title}
				</Text>
				<View
					style={{
						height: 4,
						alignSelf: 'stretch',
						backgroundColor: '#8E67BE',
						marginVertical: 10,
					}}
				/>
				<Text style={{ color: '#848181', fontWeight: 'bold' }}>
					{props.data.body}
				</Text>

				{props.data.title === 'Pickup Request Alert' && (
					<TouchableOpacity
						style={{
							backgroundColor: '#0A956A',
							borderRadius: 10,
							justifyContent: 'center',
							paddingHorizontal: 20,
							// alignSelf: "flex-end",
							paddingVertical: 10,
							marginLeft: 'auto',
							marginTop: 20,
						}}
						onPress={() => {
							//			navigation.navigate('CollectionHistoryDetail', data);
							if (props.data.metadata.pickup_request) {
								let id = props.data.metadata.pickup_request.id;
								props.updatePickupAlertWrapper(id);
							}
						}}
					>
						<Text
							style={{
								fontSize: 14,
								fontWeight: 'bold',
								color: 'white',
								textAlign: 'center',
							}}
						>
							View Details
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'center',
		margin: 0,
		position: 'absolute',
		// flex: 1,
		height: '100%',
		// alignSelf: "center",
		// justifyContent: "center",
		width: '100%',
		paddingHorizontal: 10,
	},
	modalContainer: {
		backgroundColor: '#fff',
		padding: 20,
		alignItems: 'center',
		borderRadius: 20,
	},
	textAreaContainer: {
		borderColor: '#F18921',
		borderWidth: 1,
		paddingHorizontal: 20,
		borderRadius: 10,
		marginBottom: 20,
		width: '100%',
		color: 'black',
		// alignItems: "flex-start",
	},
});

export default MessageModal;
