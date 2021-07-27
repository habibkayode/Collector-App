import React from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

const NetworkLoading = (props) => {
  return (
    <View style={styles.container}>
      <Spinner
        visible={true}
        textContent={''}
        textStyle={styles.spinnerTextStyle}
        customIndicator={
          <Image
            source={require('../assets/loading-gif.gif')}
            style={{ width: 50, height: 50 }}
          ></Image>
        }
      />
    </View>
  );
};

export default NetworkLoading;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
