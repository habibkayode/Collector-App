import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/globalStyles';
import useCounter from '../utils/hooks/counterHooks';

const SendAgain = (props) => {
	const [counter, startCount] = useCounter(60);

	return (
		<View style={styles.button}>
			<Text style={[styles.smallText, { marginBottom: 5 }]}>
				Could not received it? {counter !== 0 ? ' Resend in' : ''}
			</Text>
			{counter !== 0 && (
				<Text style={[styles.smallText, { marginBottom: 5 }]}>0:{counter}</Text>
			)}
			{counter === 0 && (
				<TouchableOpacity
					style={{ alignSelf: 'center' }}
					onPress={() => {
						props.sendFunc().then(() => {
							startCount();
						});
					}}
				>
					<Text
						style={[styles.smallText, { color: '#EF7700', marginBottom: 0 }]}
						//   onPress={() => navigation.navigate("Dashboard")}
					>
						Send Again
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

export default SendAgain;
