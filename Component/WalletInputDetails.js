import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { getUserName } from '../Api/api';
import RadioButtonRN from 'radio-buttons-react-native';
import { numberWithCommas } from '../helper/helper';

const WalletDetailsInput = (props) => {
  const [pagaData, setPagaData] = useState({
    phone: '',
    amount: '',
    type: '',
    displayAmount: '',
    narration: '',
  });
  const [userDetails, setUserDetails] = useState({});

  let getDetails = async (value) => {
    try {
      let response = await getUserName(value);
      setUserDetails(response.data);
    } catch (e) {
      console.log(e);

      if (e.response.data.error === 'Not Found.') {
        Alert.alert(
          'Notice',
          `User with the phone number ${value} is currently not registered with Scrapays.Kindly confirm if you will like to proceed  to credit this User.`,
          [
            {
              text: 'Proceed',
              onPress: () => {
                Alert.alert(
                  'Notice',
                  'No worries 😁, Transfers can be made to anyone and they will get a credit SMS with instructions to access the funds. '
                );
              },
              style: 'Cancel',
            },
            {
              text: 'No',
              onPress: () => {
                setPagaData((prev) => ({ ...prev, phone: '' }));
              },
              style: 'destructive',
            },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert('Error', e.response.data.error);
      }
    }
  };

  let makeTransfer = () => {
    let payload = {
      // full_name: pagaData.fullName,
      amount: pagaData.amount,
      beneficiary: pagaData.phone,
      type: pagaData.type,
      narration: pagaData.narration,
    };
    props.sendFunc(payload);
  };

  const radioData = [
    {
      label: props.cog ? 'Commission Account' : 'Main Account',
    },
    {
      label: 'Other Wallet',
    },
  ];

  return (
    <>
      <RadioButtonRN
        activeColor="#F18921"
        data={radioData}
        selectedBtn={(e, i) => {
          console.log(e, i);
          setPagaData((prev) => ({ ...prev, type: e.label }));
        }}
        textStyle={{ fontWeight: 'bold' }}
      />
      {pagaData.type === 'Other Wallet' && (
        <View style={[styles.inputWrapper]}>
          <TextInput
            placeholder="User Phone number"
            keyboardType="phone-pad"
            value={pagaData.phone}
            onChangeText={(value) => {
              if (value.length < 12) {
                setPagaData((prev) => {
                  return {
                    ...prev,
                    phone: value,
                  };
                });

                if (value.length === 11) {
                  getDetails(value);
                } else {
                  setUserDetails({});
                }
              }
            }}
            style={{ fontWeight: 'bold', fontSize: 16 }}
          />
        </View>
      )}
      {pagaData.type === 'Other Wallet' && userDetails.Name && (
        <View style={[styles.inputWrapper, { justifyContent: 'center' }]}>
          <Text style={{ textAlignVertical: 'center', fontWeight: 'bold' }}>
            {userDetails.Name}
          </Text>
          {/* <TextInput
          placeholder="Full name"
          value={pagaData.fullName}
          onChangeText={(value) => {
            setPagaData((prev) => {
              return {
                ...prev,
                fullName: value,
              };
            });
          }}
          style={{ fontWeight: "bold", fontSize: 16 }}
        /> */}
        </View>
      )}
      <View style={[styles.inputWrapper]}>
        <TextInput
          placeholder="Amount"
          keyboardType="numeric"
          value={pagaData.displayAmount}
          onFocus={() => {
            setPagaData((prev) => {
              return {
                ...prev,
                displayAmount: prev.amount,
              };
            });
          }}
          onEndEditing={() => {
            setPagaData((prev) => {
              return {
                ...prev,

                displayAmount: numberWithCommas(prev.amount),
              };
            });
          }}
          onChangeText={(value) => {
            let sp = value.split('.');
            if ((sp.length > 1 && sp[1].length > 2) || sp.length > 2) {
              return;
            }
            setPagaData((prev) => {
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
      <View style={[styles.textAreaWrapper]}>
        <TextInput
          placeholder="Narration"
          value={pagaData.textAreaWrapper}
          onChangeText={(value) => {
            setPagaData((prev) => {
              return {
                ...prev,
                narration: value,
              };
            });
          }}
          numberOfLines={5}
          multiline={true}
        ></TextInput>
      </View>
      {pagaData.amount &&
      (pagaData.type === 'Main Account' ||
      pagaData.type === 'Commission Account'
        ? true
        : pagaData.phone.length === 11) ? (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            makeTransfer();
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
  inputWrapper: {
    borderColor: '#F18921',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    borderRadius: 10,
    // width: "47%",
    height: 50,
    marginTop: 10,
  },
  textAreaWrapper: {
    borderColor: '#F18921',
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 20,
    borderRadius: 10,
    // width: "47%",
    marginTop: 10,
  },
});
export default WalletDetailsInput;
