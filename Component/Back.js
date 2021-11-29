import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../Styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Back = (props) => {
	return (
		<View style={styles.button}>
			<TouchableOpacity style={styles.next} onPress={props.onPress}>
				<MaterialCommunityIcons name='arrow-left' color='#EF7700' size={30} />
				<Text style={styles.directionText}>Back</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Back;
