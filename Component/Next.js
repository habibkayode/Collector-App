import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../Styles/globalStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Next = props => {
  return (
    <View style={styles.button}>
      <TouchableOpacity style={styles.next} onPress={props.onPress}>
        <Text style={styles.directionText}>Next</Text>
        <MaterialCommunityIcons name="arrow-right" color="#EF7700" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Next;
