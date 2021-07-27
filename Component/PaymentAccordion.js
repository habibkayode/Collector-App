import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from './color';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { numberWithCommas } from '../helper/helper';
import { acceptPayment, rejectPayment } from '../Api/api';

let PaymentAccordion = (props) => {
  let navigation = useNavigation();
  let [expanded, setExpanded] = useState(false);
  let accordian = useRef().current;
  const [confirm, setConfirm] = useState(false);
  const [notConfirm, setNotCofirm] = useState(false);

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  console.log(props, 'ppoiuyy');
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  let acceptHandle = async (id) => {
    //return props.setRelaod((prev) => !prev);

    try {
      let response = await acceptPayment(id);

      setConfirm(true);
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
    }
  };

  let rejectHandle = async (id) => {
    try {
      let response = await rejectPayment(id);
      setNotCofirm(true);
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
    }
  };

  return (
    <View
      style={{
        marginBottom: 10,
        borderColor: '#F18921',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
      }}
    >
      <View
        // ref={accordian}
        style={[styles.row, { flexDirection: 'row', padding: 10 }]}
        //onPress={() => toggleExpand()}
      >
        <Text style={[styles.title, styles.font]}>
          {moment(props.created_at).format('Do MMM YY , H:MM')}
        </Text>

        <TouchableOpacity
          ref={accordian}
          //    style={[styles.row, {flexDirection: 'column'}]}
          onPress={() => {
            toggleExpand();
          }}
        >
          <Icon
            style={{ alignSelf: 'center' }}
            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={30}
            color={Colors.DARKGRAY}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.parentHr} />
      {expanded && (
        <View style={styles.child}>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.mainHeading}>
              Per-kilo Materials {' & '}Tonnage
            </Text>
            <View style={{}}>
              {props.collections.map((i) => {
                return (
                  <>
                    {i.materials
                      .filter((i) => i.pivot.material_type === 'Homogeneous')
                      .map((i) => {
                        console.log(i.pivot);
                        return (
                          <View
                            style={{
                              padding: 20,
                              paddingVertical: 10,
                              borderRadius: 10,
                              // marginBottom: 10,
                              paddingTop: 5,
                              // borderColor: "#F18921",
                              //   borderWidth: 1,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: 'black',
                                }}
                              >
                                {i.name}
                              </Text>

                              <Text
                                style={{
                                  fontSize: 15,
                                  color: 'black',
                                }}
                              >
                                {i.pivot.tonnage}kg
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}
                            >
                              <Text>Cost Price</Text>
                              <Text>
                                {numberWithCommas(
                                  Number(i.producer_commission) *
                                    Number(i.pivot.tonnage)
                                )}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}
                            >
                              <Text>Commission</Text>
                              <Text>
                                {numberWithCommas(
                                  Number(i.collector_commission) *
                                    Number(i.pivot.tonnage)
                                )}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                  </>
                );
              })}
            </View>
            <Text style={styles.mainHeading}>Household Materials </Text>
            <View style={{ marginBottom: 30 }}>
              {props.collections.map((i) => {
                return (
                  <>
                    {i.materials
                      .filter((i) => i.pivot.material_type === 'Composite')
                      .map((i) => {
                        return (
                          <View
                            style={{
                              padding: 20,
                              paddingVertical: 10,
                              borderRadius: 10,
                              // marginBottom: 10,
                              paddingTop: 5,
                              // borderColor: "#F18921",
                              //   borderWidth: 1,
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,
                                color: 'black',
                              }}
                            >
                              {i.item}
                            </Text>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}
                            >
                              <Text>Cost Price</Text>
                              <Text>
                                {numberWithCommas(
                                  Number(i.collector_commission)
                                )}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 3,
                              }}
                            >
                              <Text>Commission</Text>
                              <Text>
                                {numberWithCommas(
                                  Number(i.collector_commission)
                                )}
                              </Text>
                            </View>
                          </View>
                        );
                      })}
                  </>
                );
              })}
            </View>

            <Text style={styles.mainHeading}>Estimated Commission</Text>
            <View style={styles.leftWrapper}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 15 }}>
                  {numberWithCommas(props.commissions.collector)}
                </Text>
              </View>
            </View>

            <Text style={styles.mainHeading}>Estimated Cost of Goods</Text>
            <View style={styles.leftWrapper}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: 15 }}>
                  {numberWithCommas(Number(props.commissions.producer))}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 30,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 45,
                  backgroundColor: '#0A956A',
                  borderRadius: 10,
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  // setConfirm(true);
                  //  props.navigation.navigate("confirmation");
                  acceptHandle(props.id);
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 45,
                  backgroundColor: '#E50202',
                  borderRadius: 10,
                  justifyContent: 'center',
                  paddingHorizontal: 20,
                }}
                onPress={() => {
                  // setNotCofirm(true);
                  //   props.navigation.navigate("confirmation");
                  rejectHandle(props.id);
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}
                >
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <Modal
        transparent={true}
        style={[
          {
            flex: 1,
          },
        ]}
        onRequestClose={() => {
          setConfirm(false);
          props.setRelaod((prev) => !prev);
        }}
        visible={confirm}
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 203,
              height: 203,
              borderColor: '#0A956A',
              borderWidth: 2,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 110,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image
              style={{ marginTop: 30 }}
              source={require('../assets/check-big.png')}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              paddingHorizontal: 30,
              textAlign: 'center',
              fontSize: 16,
              lineHeight: 18,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Payment Confirmed
          </Text>
        </View>
      </Modal>
      <Modal
        transparent={true}
        style={[
          {
            flex: 1,
          },
        ]}
        onRequestClose={() => {
          setNotCofirm(false);
          props.setRelaod((prev) => !prev);
        }}
        visible={notConfirm}
      >
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 203,
              height: 203,
              borderColor: '#D10B0B',
              borderWidth: 2,
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: 110,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
            }}
          >
            <Image style={{}} source={require('../assets/X.png')} />
          </View>
          <Text
            style={{
              marginTop: 20,
              paddingHorizontal: 30,
              textAlign: 'center',
              fontSize: 16,
              lineHeight: 18,
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Payment Rejected{' '}
          </Text>

          <Text
            style={{
              marginTop: 40,
              paddingHorizontal: 30,
              textAlign: 'center',
              fontSize: 14,
              lineHeight: 18,
              color: 'white',
            }}
          >
            *Please sort with agent or call support on 07088592037
          </Text>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  row: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    //  height: 56,
    //paddingLeft: 25,
    // paddingRight: 18,
    paddingHorizontal: 20,
    //alignItems: 'center',
    //  backgroundColor: Colors.CGRAY,
  },
  mainHeading: { fontSize: 15, fontWeight: 'bold' },

  parentHr: {
    height: 1,
    color: Colors.WHITE,
    width: '100%',
  },
  child: {
    // backgroundColor: Colors.LIGHTGRAY,
    // padding: 16,
  },
  leftWrapper: { marginTop: 5, marginLeft: 20 },
});

export default PaymentAccordion;
