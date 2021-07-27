import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Bgcover from '../Component/Bg/BackgroundCover';
import CollectionLogCard from '../Component/CollectionLogCard';
import {
  getAcceptedPickupRequst,
  getAllAcceptedPickupRequst,
} from '../Api/api';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  console.log(state.normal.acceptedPickupRequests);
  return {
    acceptedPickupRequests: state.normal.acceptedPickupRequests,
  };
};

const CollectionLogScreen = ({ navigation, ...props }) => {
  const [searchText, setSearchTex] = useState();
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [allAcceptedPickup, setAllAcceptedPickup] = useState([]);

  let getAcceptedPickup = async () => {
    try {
      let response = await getAllAcceptedPickupRequst();
      setAllAcceptedPickup(response);
      console.log(response, 'pppkkiooiii000======');
      setData(response);
    } catch (e) {
      console.log(e, 'error in all pickup');
    }
  };

  let removeById = (id) => {
    setData((prev) => {
      let newState = prev.filter((i) => i.id !== id);
      return newState;
    });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      getAcceptedPickup().then(() => {
        setSearchTex('');
        setLoading(false);
      });
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const handleTextChange = (values) => {
    let newState = allAcceptedPickup.filter((ele) => {
      let eleValue = ele.producer_name.toUpperCase();
      let valueCap = values.toUpperCase();
      return eleValue.indexOf(valueCap) > -1;
    });
    setData(newState);
  };

  let get = async (page = 1, refreshing = false) => {
    getAcceptedPickupRequst(page, refreshing);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    get(pages + 1)
      .then(() => {
        setPages(pages + 1);
      })
      .finally(() => setLoadingMore(false));
    console.log('i am here handle load more');
  };

  const handleRefresh = () => {
    setRefreshing(true);
    getAcceptedPickup().then(() => {
      setSearchTex('');
      setRefreshing(false);
    });
  };

  // const handleRefresh = () => {
  //   setPages(1);
  //   setRefreshing(true);
  //   get(1, true).then(() => setRefreshing(false));
  // };

  // useEffect(() => {
  //   get(1, true).then(() => setLoading(false));
  // }, []);

  const redirectFunc = () => {
    navigation.navigate('MapScreen');
  };
  // return (
  //   <Bgcover name="Collection Log">
  //     {loading ? (
  //       <View
  //         style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  //       >
  //         <ActivityIndicator size="large" color="#F18921" />
  //       </View>
  //     ) : (
  //       <FlatList
  //         ListEmptyComponent={() => {
  //           return (
  //             <View
  //               style={{
  //                 alignItems: "center",
  //                 justifyContent: "center",
  //                 flex: 1,
  //               }}
  //             >
  //               <Text style={{ fontWeight: "bold", fontSize: 20 }}>
  //                 No Pick Data yet
  //               </Text>
  //             </View>
  //           );
  //         }}
  //         contentContainerStyle={{ marginHorizontal: 20 }}
  //         onRefresh={handleRefresh}
  //         refreshing={refreshing}
  //         data={props.acceptedPickupRequests}
  //         renderItem={({ item }) => {
  //           return (
  //             <CollectionLogCard
  //               data={item}
  //               buttonName={"Pickup Now"}
  //               redirectFunc={() => {
  //                 navigation.navigate("MapScreen", item);
  //               }}
  //             />
  //           );
  //         }}
  //         keyExtractor={(item, index) => {
  //           return index.toString();
  //         }}
  //         extraData={props.acceptedPickupRequests}
  //         onEndReached={handleLoadMore}
  //         onEndReachedThreshold={0.5}
  //         initialNumToRender={10}
  //         ListFooterComponent={() =>
  //           loadingMore ? <ListFooterComponent /> : null
  //         }
  //       />
  //     )}

  //     {/* <ScrollView>
  //       <View style={{ marginHorizontal: 20 }}>
  //         <CollectionLogCard
  //           buttonName={"Pickup Now"}
  //           redirectFunc={redirectFunc}
  //         />
  //         <CollectionLogCard
  //           buttonName={"Pickup Now"}
  //           redirectFunc={redirectFunc}
  //         />
  //         <CollectionLogCard
  //           buttonName={"Pickup Now"}
  //           redirectFunc={redirectFunc}
  //         />
  //         <CollectionLogCard
  //           buttonName={"Pickup Now"}
  //           redirectFunc={redirectFunc}
  //         />
  //         <CollectionLogCard
  //           buttonName={"Pickup Now"}
  //           redirectFunc={redirectFunc}
  //         />
  //       </View>
  //     </ScrollView> */}
  //   </Bgcover>
  // );
  return (
    <Bgcover name="Collection Log">
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
              marginBottom: 20,
            }}
          >
            <Image
              style={{ marginRight: 10 }}
              source={require('../assets/loupe1.png')}
            />
            <TextInput
              placeholder="search for new Collection"
              placeholderTextColor="#D3D3D3"
              style={{ fontSize: 15, fontWeight: 'bold', flex: 1 }}
              onChangeText={handleTextChange}
            />
          </View>
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
                ... No Collection Data yet
              </Text>
            </View>
          )}
          <FlatList
            contentContainerStyle={{ marginHorizontal: 20 }}
            onRefresh={handleRefresh}
            refreshing={refreshing}
            data={data}
            renderItem={({ item }) => {
              return (
                <CollectionLogCard
                  data={item}
                  removeById={removeById}
                  buttonName={'Pickup Now'}
                  redirectFunc={() => {
                    navigation.navigate('MapScreen', item);
                  }}
                />
              );
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
    </Bgcover>
  );
};

export default connect(mapStateToProps, null)(CollectionLogScreen);

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
    <ActivityIndicator animating size="large" color={'#F18921'} />
  </View>
);
