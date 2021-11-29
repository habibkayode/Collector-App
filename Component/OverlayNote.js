import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { updateLoggedIn } from '../Redux/actionCreator';
import { store } from '../Redux/store';

const OverlayNote = (props) => {
	return (
		<Modal
			isVisible
			style={styles.modal}
			animationInTiming={600}
			onBackButtonPress={() => {
				store.dispatch(updateLoggedIn(false));
			}}
		>
			<View style={styles.modalContainer}>
				<Text style={styles.modalTitle}>Please Note</Text>
				<Text style={styles.modalText}>
					Before any action can perform, your KYC details as to be approved
					first
				</Text>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: 'flex-end',
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

export default OverlayNote;
