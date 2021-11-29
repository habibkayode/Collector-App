import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { updateKycNoteModal } from '../Redux/actionCreator';
import { store } from '../Redux/store';
//import * as globalStyles from '../Styles/globalStyles';

const kycNoteModalComp = (props) => {
	let closeModal = () => {
		store.dispatch(updateKycNoteModal(false));
	};
	return (
		<Modal
			isVisible
			style={styles.modal}
			animationInTiming={600}
			onBackButtonPress={() => {
				//   closeModal();
			}}
		>
			<View style={styles.modalContainer}>
				<Text style={styles.modalTitle}>Note</Text>
				<Text style={styles.modalText}>
					Before you can perform any action you KYC Details must be filled and
					approved by Scrapays Admin
				</Text>
				<TouchableOpacity style={styles.button}>
					<Text>Fill KYC</Text>
				</TouchableOpacity>
			</View>
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
	},
	modalContainer: {
		backgroundColor: '#fff',
		paddingHorizontal: 16,
		paddingTop: 20,
		paddingBottom: 40,
		alignItems: 'center',
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: '600',
	},
	modalText: {
		fontSize: 18,
		color: '#555',
		marginTop: 14,
		textAlign: 'center',
		marginBottom: 10,
	},
	button: {
		backgroundColor: '#000',
		paddingVertical: 12,
		paddingHorizontal: 16,
		width: '100%',
		alignItems: 'center',
		marginTop: 10,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
	},
});

export default kycNoteModalComp;
