import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { numberWithCommas } from '../helper/helper';

const AirttimeInputDetails = (props) => {
  const [airtimeData, setAirtimeData] = useState({
    recharge_phone: '',
    amount: '',
    displayAmount: '',
  });

  const sendAirtime = () => {
    props.sendFunc(airtimeData);
  };
  return (
    <>
      <View
        style={{
          borderColor: '#F18921',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingHorizontal: 20,
          borderRadius: 10,
          // width: "47%",
          height: 50,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="Phone number"
          keyboardType="phone-pad"
          value={airtimeData.recharge_phone}
          onChangeText={(value) => {
            setAirtimeData((prev) => {
              return {
                ...prev,
                recharge_phone: value,
              };
            });
          }}
          style={{ fontWeight: 'bold', fontSize: 16 }}
        />
      </View>
      <View
        style={{
          borderColor: '#F18921',
          borderWidth: 1,
          borderStyle: 'solid',
          paddingHorizontal: 20,
          borderRadius: 10,
          // width: "47%",
          height: 50,
          marginBottom: 20,
        }}
      >
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={airtimeData.displayAmount}
          onFocus={() => {
            setAirtimeData((prev) => {
              return {
                ...prev,
                displayAmount: prev.amount,
              };
            });
          }}
          onEndEditing={() => {
            console.log('i was called 2');
            setAirtimeData((prev) => {
              return {
                ...prev,

                displayAmount: numberWithCommas(prev.amount),
              };
            });
          }}
          onChangeText={(value) => {
            let sp = value.split('.');
            if (sp.length > 1) {
              return;
            }
            setAirtimeData((prev) => {
              return {
                ...prev,
                amount: value,
                displayAmount: value,
              };
            });
          }}
          style={{ fontWeight: 'bold', fontSize: 16 }}
        />
      </View>
      {airtimeData.amount && airtimeData.recharge_phone.length === 11 ? (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            sendAirtime();
          }}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  sendButton: {
    height: 55,
    backgroundColor: '#0A956A',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 40,
    marginHorizontal: 20,
    marginTop: 40,
    alignSelf: 'center',
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default AirttimeInputDetails;
