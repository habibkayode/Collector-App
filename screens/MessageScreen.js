import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Bgcover from '../Component/Bg/BackgroundCover';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MessageModal from '../Component/MessageModal';
import { deleteNotification, getAllNofification } from '../Api/api';
import { updatePickupAlertModal } from '../Redux/actionCreator';
import { connect } from 'react-redux';

import moment from 'moment';

const mapStateToProps = (state) => {
  return {
    notifications: state.normal.notifications,
    redirect: state.normal.redirect,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('her');
  return {
    updatePickupAlertModal: (obj) => {
      console.log('llllldllldlddl');
      dispatch(updatePickupAlertModal(obj));
    },
  };
};

const MessageScreen = (props) => {
  let [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedIndex, setSelectIndex] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  let [allNotification, setAllNotification] = useState([]);
  //   useEffect(() => {
  //       getAllNofification().then(setLoading(false));
  //   }, []);

  let getAllNofificationWrapper = async () => {
    try {
      let response = await getAllNofification();
      setAllNotification(response);
      console.log(':pppp', response[0], 'ooppppppppppppp');
      if (props.redirect.status && response[0].metadata) {
        if (response[0].metadata.pickup_request) {
          console.log(':pppp', response[0].metadata.pickup_request);
          props.updatePickupAlertModal({
            status: true,
            id: response[0].metadata.pickup_request.id,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      // Alert.alert('Error', error.response.data.error);
    }
  };

  let deleteNotificationWrapper = async (id) => {
    try {
      let response = await deleteNotification(id);
      Alert.alert('Info', 'Message deleted successfully');
      //setRefresh(!refresh);
    } catch (error) {
      Alert.alert('Error', error.response.data.error);
    }
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      //  setLoading(true);
      getAllNofificationWrapper().then(() => {});
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [props.navigation, refresh]);

  let handleModalBackButton = () => {
    setShowMessageModal(!showMessageModal);
  };

  return (
    <Bgcover name="New Message">
      <ScrollView contentContainerStyle={{ marginHorizontal: 10 }}>
        {loading && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../assets/loading-gif.gif')}
              style={{ width: 50, height: 50 }}
            ></Image>
          </View>
        )}
        {showMessageModal && (
          <MessageModal
            showMessage={showMessageModal}
            handleModalBackButton={handleModalBackButton}
            data={allNotification[selectedIndex]}
          />
        )}
        {allNotification.map((i, index) => (
          <Message
            data={i}
            index={index}
            setShowMessageModal={setShowMessageModal}
            setSelectIndex={setSelectIndex}
            key={i.id}
            deleteNotificationWrapper={deleteNotificationWrapper}
          />
        ))}

        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20}}>
            No notification yet
          </Text>
        </View> */}
      </ScrollView>
    </Bgcover>
  );
};

let Message = ({
  data,
  index,
  setSelectIndex,
  setShowMessageModal,
  deleteNotificationWrapper,
}) => {
  return (
    <View
      style={{
        //borderStyle: "solid",
        //  padding: 20,
        borderColor: '#DCDCDC',
        //  backgroundColor: "#fff",
        borderRadius: 20,

        width: '100%',
        borderWidth: 1,
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          setSelectIndex(index);
          setShowMessageModal(true);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          //  elevation: 3,
          borderColor: 'rgba(16, 170, 174, 0.2)',
          paddingHorizontal: 10,
          // height: "auto",
          paddingVertical: 15,
          width: '100%',
        }}
      >
        <View
          style={{
            height: '100%',
            width: 4,
            backgroundColor: '#8E67BE',
            marginRight: 10,
          }}
        ></View>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              numberOfLines={1}
              style={{ fontSize: 14, fontWeight: 'bold' }}
            >
              {data.title}
            </Text>
            <Text style={{ alignSelf: 'center', fontSize: 12 }}>
              {moment(data.created_at).format('ddd, h:m A ,yy')}
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              numberOfLines={1}
              style={{
                // marginVertical: 10,
                //fontWeight: "bold",
                color: 'rgba(0,0,0,0.5)',
                maxWidth: '80%',
              }}
            >
              {data.body}
            </Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                deleteNotificationWrapper(data.id);
              }}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                color="red"
                //style={{alignSelf: 'flex-end'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageScreen);
