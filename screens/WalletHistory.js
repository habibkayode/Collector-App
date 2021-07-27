import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Bgcover from '../Component/Bg/BackgroundCover';
import { getAllCollection } from '../Api/api';
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';
import DateRangePicker from 'react-native-daterange-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import CalendarPicker from 'react-native-calendar-picker';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { numberWithCommas } from '../helper/helper';

const mapStateToProps = (state) => {
  return {
    pendingCollection: state.normal.pendingCollection,
    materialsObj: state.normal.materialsObj,
  };
};

const WalletHistory = (props) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allCollection, setAllColleciton] = useState([]);
  const [allTransaction, setAllTransaction] = useState([]);
  const [stausFilter, setStatusFilter] = useState();
  const [showDatePicker, setDatePickerShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [modalCalender, setModalCalender] = useState(false);

  //filter data as allCollection is changing

  let getAllCollectionCaller = async () => {
    try {
      let response = await getAllCollection(page);

      // console.log(response, "pagess");
      if (page === 1) {
        setData(response);
        setAllColleciton(response);
      } else {
        setData((prev) => [...prev, ...response]);
        setAllColleciton((prev) => [...prev, ...response]);
      }
      console.log('her');
      setLoading(false);
      setRefreshing(false);
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      //  setLoading(true);
      setPage(1);
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    if (page) {
      getAllCollectionCaller().then(() => {
        console.log('finishi loading', page);
        setLoading(false);
        setRefreshing(false);
      });
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  let handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
  };

  let onDateChange = (date, type) => {
    console.log(date, type, 'dates');
    if (type === 'END_DATE') {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };

  return (
    <Bgcover name="Transaction History">
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../assets/loading-gif.gif')}
            style={{ width: 50, height: 50 }}
          ></Image>
        </View>
      ) : allCollection.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 18, textAlign: 'center', color: '#F18921' }}>
            No Transaction Data yet..
          </Text>
        </View>
      ) : (
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginHorizontal: 20,
              marginBottom: 10,
              color: 'black',
            }}
          >
            Filter By
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              width: '100%',
              //  backgroundColor: "red",
              marginBottom: 20,
            }}
          >
            <Dropdown
              placeholder="Type"
              placeholderTextColor="gray"
              baseColor="grey"
              onChangeText={(value, index) => {
                console.log(value);
                if (value === 'all') {
                  setData((prev) => allCollection);
                  console.log('i am here', allCollection.length);
                } else {
                  let newCollection = allCollection.filter(
                    (i) => i.drop_off_status === value
                  );
                  setData(newCollection);
                }
              }}
              // textColor="white"
              fontSize={12}
              dropdownOffset={{ top: 0, left: 0 }}
              containerStyle={{
                borderWidth: 1,
                borderColor: '#F18921',
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputContainerStyle={{
                width: 80,
                borderBottomColor: 'transparent',
                paddingBottom: 0,
              }}
              data={[
                {
                  label: 'All ',
                  value: 'all',
                },
                {
                  label: 'Withdraw',
                  value: 'Withdraw',
                },
                {
                  label: 'Credit',
                  value: 'Credit',
                },
              ]}
            />
            <Dropdown
              // label="Status"
              placeholder="Days"
              placeholderTextColor="black"
              baseColor="gray"
              textColor="black"
              //   itemColor="white"
              selectedItemColor="black"
              fontSize={12}
              dropdownOffset={{ top: 0, left: 0 }}
              containerStyle={{
                borderWidth: 1,
                borderColor: '#F18921',
                borderRadius: 10,
                paddingHorizontal: 10,
              }}
              inputContainerStyle={{
                width: 94,
                borderBottomColor: 'transparent',
                paddingBottom: 0,
              }}
              data={[
                {
                  label: 'All ',
                  value: 'all',
                },
                {
                  label: 'Today',
                  value: 0,
                },
                {
                  label: '3 days Ago',
                  value: 3,
                },
                {
                  label: '1 week Ago',
                  value: 7,
                },
                {
                  label: '2 Weeks',
                  value: 14,
                },

                {
                  label: '1 month Ago',
                  value: 30,
                },

                {
                  label: '2 month Ago',
                  value: 60,
                },

                {
                  label: '3 month Ago',
                  value: 90,
                },

                {
                  label: '6 month Ago',
                  value: 180,
                },
              ]}
            />

            <TouchableOpacity
              style={{
                marginRight: 20,
                justifyContent: 'center',
                flexDirection: 'row',
                top: 5,
                right: 5,
                // borderWidth: 1,
                // borderColor: "#F18921",
                // borderRadius: 10,
                // padding: 10,
              }}
              onPress={() => {
                setModalCalender(true);
              }}
              //  style={{ flexDirection: "row" }}
            >
              <MaterialCommunityIcons
                name="calendar-range"
                color="grey"
                size={20}
              />
              {/* <Text>Date Range</Text> */}
            </TouchableOpacity>
          </View>

          <FlatList
            contentContainerStyle={{}}
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                    textAlign: 'center',
                    backgroundColor: '#F18921',
                    paddingVertical: 5,
                  }}
                >
                  <Text style={styles.headerText}>Amount</Text>
                  <Text style={styles.headerText}>Transaction type</Text>
                  <Text style={styles.headerText}>Date</Text>
                </View>
              );
            }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('WalletDetail', item);
                  }}
                  style={{
                    flex: 1,
                    alignSelf: 'stretch',
                    flexDirection: 'row',
                    paddingVertical: 5,
                    backgroundColor: '#FDF2E7',
                  }}
                >
                  <Text numberOfLines={2} style={styles.bodyText}>
                    3000,000.00
                  </Text>
                  <Text numberOfLines={2} style={styles.bodyText}>
                    Credit
                  </Text>
                  <Text numberOfLines={3} style={styles.bodyText}>
                    {new Date().toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
            extraData={data}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
            initialNumToRender={10}
          />
        </View>
      )}

      <Modal
        isVisible={modalCalender}
        onBackButtonPress={() => {
          setModalCalender(false);
        }}
        style={styles.modal}
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.5}
        animationIn="slideInDown"
        animationOut="slideOutUp"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ height: '100%', width: '100%', flex: 1 }}
          onPress={() => {
            console.log('first 11');
            setModalCalender(false);
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              console.log('first');
            }}
          >
            <View style={{ backgroundColor: 'white', marginHorizontal: 10 }}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                //  minDate={minDate}
                maxDate={new Date()}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#F18921"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </Bgcover>
  );
};

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlignVertical: 'center',
  },
  bodyText: {
    flex: 1,
    alignSelf: 'stretch',
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    fontWeight: 'bold',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#F18921',
    borderStyle: 'solid',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    // alignSelf: "flex-start",
    flex: 1,
  },
  pickerInputAndroid: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
  },
  modal: {
    //  justifyContent: "center",
    margin: 0,
    position: 'absolute',
    flex: 1,
    height: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
  },
});

export default WalletHistory;
