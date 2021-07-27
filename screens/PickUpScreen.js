import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import Modal from 'react-native-modal';
import {
  getSingleCollectorPickUp,
  getAllSingleCollectorPickUp,
  getProducerDetails,
} from '../Api/api';
import PickUpCard from '../Component/PickUpCard';
import { connect } from 'react-redux';
import Bgcover from '../Component/Bg/BackgroundCover';
import { useFocusEffect } from '@react-navigation/native';

const mapStateToProps = (state) => {
  return {
    pickupData: state.normal.pickupRequests,
    materials: state.normal.materials,
  };
};

const PickupScreen = (props) => {
  const [searchText, setSearchTex] = useState();
  const [data, setData] = useState(props.pickupData);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [allPickup, setAllPickup] = useState([]);
  const [showModal, setShowModal] = useState(false);
  let [producerDetails, setProducerDetails] = useState({});
  let [newRequest, setNewRequest] = useState({
    name: '',
    phone: '',
  });

  // useEffect(() => {
  //   setData(props.pickupData);
  // }, [props.pickupData]);

  let getPickup = async () => {
    getSingleCollectorPickUp();
  };

  let getDetails = async () => {
    try {
      let response = await getProducerDetails(newRequest);
      setProducerDetails(response.data);
      // setShowModal(false);
    } catch (e) {
      console.log(e);

      if (e.response?.data.error === 'Not Found.') {
        Alert.alert(
          'Not Found',
          `The phone number ${newRequest.phone} is not yet registered as a Scrapays producer \n\n Please inform the custuomer to dial *347*477# and process again`
        );
      } else {
        Alert.alert('Error', e.response.data.error);
      }
    }
  };

  let getAllPickup = async () => {
    try {
      let response = await getAllSingleCollectorPickUp();
      setAllPickup(response);
      setData(response);
    } catch (e) {
      console.log(e, 'error in all pickup');
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setLoading(true);
      getAllPickup().then(() => {
        setSearchTex('');
        setLoading(false);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    getPickup(pages + 1)
      .then(() => {
        setPages(pages + 1);
      })
      .finally(() => setLoadingMore(false));
    csole.log('i am here handle load more');
  };

  const handleTextChange = (values) => {
    let newState = allPickup.filter((ele) => {
      let eleValue = ele.producer_name.toUpperCase();
      let valueCap = values.toUpperCase();
      return eleValue.indexOf(valueCap) > -1;
    });

    setData(newState);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAllPickup().then(() => {
      setSearchTex('');
      setRefreshing(false);
    });
  };
  // const handleRefresh = () => {
  //   setPages(1);
  //   setRefreshing(true);
  //   getSingleCollectorPickUp(1, true).then(() => setRefreshing(false));
  // };

  // useEffect(() => {
  //   getSingleCollectorPickUp(1, true).then(() => setLoading(false));
  // }, []);

  return (
    <Bgcover name="New Pickup Request ">
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            source={require('../assets/loading-gif.gif')}
            style={{ width: 50, height: 50 }}
          ></Image>
        </View>
      ) : (
        <>
          <View
            style={{
              paddingHorizontal: 10,
              marginHorizontal: 20,
              height: 50,
              backgroundColor: '#F0F0F0',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <Image
              style={{ marginRight: 10 }}
              source={require('../assets/loupe1.png')}
            />
            <TextInput
              placeholder="search for new request"
              placeholderTextColor="#D3D3D3"
              style={{ fontSize: 15, fontWeight: 'bold', flex: 1 }}
              onChangeText={handleTextChange}
            />
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              alignSelf: 'flex-end',
              marginHorizontal: 20,
            }}
            onPress={() => {
              setShowModal(true);
            }}
          >
            <View
              style={{
                backgroundColor: '#F18921',
                paddingVertical: 2,
                borderRadius: 10,
                paddingHorizontal: 3,
                marginRight: 5,
                alignSelf: 'flex-start',
                top: 0,
              }}
            >
              <Image
                style={{ bottom: 0 }}
                source={require('../assets/addition-thick-symbol.png')}
              />
            </View>
            <Text
              style={{ color: 'black', fontWeight: 'bold', marginRight: 5 }}
            >
              Add new pickup request
            </Text>
          </TouchableOpacity>
          {data.length === 0 && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                // flex: 1,
                // position: "absolute",
                width: '100%',
                height: '100%',
                //backgroundColor: "red",
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#F18921',
                }}
              >
                ... No Pickup Data yet
              </Text>
            </View>
          )}
          <FlatList
            // ListEmptyComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         alignItems: "center",
            //         justifyContent: "center",
            //         // flex: 1,
            //         // position: "absolute",
            //         width: "100%",
            //         height: "100%",
            //         backgroundColor: "red",
            //       }}
            //     >
            //       <Text
            //         style={{
            //           fontWeight: "bold",
            //           fontSize: 20,
            //           color: "#F18921",
            //         }}
            //       >
            //         No Pick Data yet
            //       </Text>
            //     </View>
            //   );
            // }}
            contentContainerStyle={{ marginHorizontal: 20 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            renderItem={({ item }) => {
              return <PickUpCard data={item} />;
            }}
            keyExtractor={(item, index) => {
              return index;
            }}
            //extraData={props}
            //onEndReached={handleLoadMore}
            // onEndReachedThreshold={0.5}
            //initialNumToRender={10}
          />

          {/* 
          <FlatList
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    No Pick Data yet
                  </Text>
                </View>
              );
            }}
            contentContainerStyle={{ marginHorizontal: 20 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            renderItem={({ item }) => {
              return <PickUpCard data={item} />;
            }}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            extraData={props}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={() =>
              loadingMore ? <ListFooterComponent /> : null
            }
          /> */}
        </>
      )}

      <Modal
        isVisible={showModal}
        onBackButtonPress={() => {
          setShowModal(false);
          setProducerDetails({});
          setNewRequest({ name: '', phone: '' });
        }}
        style={styles.modal}
        animationInTiming={600}
        backdropOpacity={0.5}
      >
        <View style={styles.modalContainer}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 30,
            }}
          >
            Add new pickup request
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Producer Phone number"
              value={newRequest.phone}
              keyboardType="phone-pad"
              onChangeText={(value) =>
                setNewRequest((prev) => ({ ...prev, phone: value }))
              }
            />
          </View>

          {producerDetails.Name && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: 'bold', marginRight: 5 }}>
                  Name :
                </Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {producerDetails.Name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-start',
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: 'bold', marginRight: 5 }}>ID :</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {producerDetails.producer_id}
                </Text>
              </View>
            </>
          )}

          {producerDetails.Name ? (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                // getDetails();

                props.navigation.navigate('ProcessPickup', {
                  producer: {
                    phone: newRequest.phone,
                    name: producerDetails.Name,
                  },
                  producer_id: producerDetails.producer_id,
                  producer_name: producerDetails.Name,
                });
                setShowModal(false);
                setProducerDetails({});
                setNewRequest({ name: '', phone: '' });
              }}
            >
              <Text style={styles.sendButtonText}>Proceed</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => {
                getDetails();
              }}
            >
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </Bgcover>
  );
};

const ListFooterComponent = () => (
  <View
    style={{
      position: 'relative',
      width: '100%',
      height: 40,
      paddingVertical: 20,
      marginTop: 10,
      marginBottom: 10,
      borderColor: '#F18921',
      justifyContent: 'center',
    }}
  >
    <Image
      source={require('../assets/loading-gif.gif')}
      style={{ width: 50, height: 50 }}
    ></Image>
  </View>
);

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
    width: '100%',
    // marginBottom: 20,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
    position: 'absolute',
    flex: 1,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    // alignItems: "center",
    width: '90%',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderRadius: 20,
    //alignSelf: "center",
    width: '100%',
  },
});

export default connect(mapStateToProps, null)(PickupScreen);
