import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/core';
import * as Animatable from 'react-native-animatable';
import Bgcover from '../Component/Bg/BackgroundCover';
import { numberWithCommas } from '../helper/helper';
import moment from 'moment';

const WalletDetailScreen = () => {
  let transactionDetail = useRoute().params;
  console.log(transactionDetail, 'ddd');

  return (
    <Bgcover name="Transaction Details">
      <View style={{ marginHorizontal: 20 }}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: 'bold',
            textAlign: 'right',
            marginBottom: 10,
          }}
        >
          {moment(transactionDetail.date).format('Do MMM YY,h:mm:ss a')}
        </Text>
        {/* <Text style={styles.mainHeading}>Transaction Id </Text>
        <View style={styles.leftWrapper}>
          <Text>{transactionDetail.id}</Text>
        </View> */}
        <Text style={styles.mainHeading}>Transaction Type</Text>
        <View style={styles.leftWrapper}>
          <Text>{transactionDetail.type === 'Cr' ? 'Credit' : 'Debit'}</Text>
        </View>
        <Text style={styles.mainHeading}>Transaction Amount</Text>
        <View style={styles.leftWrapper}>
          <Text>{numberWithCommas(transactionDetail.amount)}</Text>
        </View>
        <Text style={styles.mainHeading}>Narration</Text>
        <View style={styles.leftWrapper}>
          <Text> {transactionDetail.narration} </Text>
        </View>
        <Text style={styles.mainHeading}>Beneficiary</Text>
        <View style={styles.leftWrapper}>
          <Text> {transactionDetail.Beneficiary} </Text>
        </View>
      </View>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  mainHeading: { fontSize: 15, fontWeight: 'bold', marginTop: 20 },
  leftWrapper: { marginTop: 10, marginLeft: 20 },
});

export default WalletDetailScreen;
