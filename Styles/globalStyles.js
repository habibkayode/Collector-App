import { StyleSheet } from 'react-native';
import { colors } from './colors';

const styles = StyleSheet.create({
	errorMsg: {
		color: '#FF0000',
		fontSize: 14,
	},
	underLineInput: {
		// flex: 1,
		//marginTop: -20,
		paddingLeft: 10,
		color: '#05375a',
	},
	underLineInputWrapper: {
		flexDirection: 'row',
		marginTop: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.primary,
	},
	signUp: {
		paddingHorizontal: 80,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
	},
	textSign: {
		fontSize: 18,
		fontWeight: 'bold',
		width: '80%',
		textAlignVertical: 'center',
	},
	next: {
		alignSelf: 'flex-end',
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	directionText: {
		color: 'black',
		fontSize: 15,
		marginLeft: 10,
		fontWeight: 'bold',
	},
	submit: {
		height: 55,
		backgroundColor: colors.secondary,
		borderRadius: 10,
		justifyContent: 'center',
		paddingHorizontal: 20,
		marginHorizontal: 20,
		marginTop: 40,
	},
	smallText: { fontSize: 18, marginBottom: 30 },
	button: {
		alignItems: 'center',
		marginTop: 50,
	},
});

export { styles };
