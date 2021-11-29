import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import Bgcover from '../../Component/Bg/BackgroundCover';
import {Dropdown} from 'react-native-material-dropdown';
import UnderLineInput from '../../Component/input/UnderlineInput';
import DateTimePicker from '@react-native-community/datetimepicker';

import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/colors';
import {styles} from '../../Styles/globalStyles';
import FileUploadUi from '../../Component/Upload/FileUpload';
import {PagesName} from './constant';
import StepIndicator from '../../Component/StepIndicator/indicator';
import Next from '../../Component/Next';
import Back from '../../Component/Back';

const ALLSTATE = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

const NextOfKin = props => {
  const [showBirthDay, setShowBirthDay] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));

  const [show, setShow] = useState(false);

  const updateShowBirthDay = () => {
    setShowBirthDay(true);
  };

  return (
    <Bgcover name="KYC Form">
      <ScrollView contentContainerStyle={{marginHorizontal: 20}}>
        <StepIndicator currentPosition={1} />
        <UnderLineInput placeholder="Full Name (Next of Kin)" />
        <Dropdown
          dropdownOffset={{top: 0, left: 0}}
          fontSize={10}
          placeholder="Relationship with next of kin"
          //    style={{fontSize: 20}}
          containerStyle={{marginTop: 5}}
          inputContainerStyle={{
            borderBottomColor: colors.primary,
            borderBottomWidth: 1.5,
            fontSize: 20,
          }}
          onChangeText={value => {}}
          data={[
            {
              label: 'MR',
              value: 'mr',
              color: 'black',
            },
            {
              label: 'MRS',
              value: 'mrs',
              color: 'black',
            },
            {
              label: 'MISS',
              value: 'miss',
              color: 'black',
            },
          ]}
        />

        <UnderLineInput
          keyboardType="phone-pad"
          placeholder="Phone Number (Next of Kin)"
        />
        <UnderLineInput placeholder="Email (Next of Kin)" />
        <Dropdown
          placeholder="Nationality"
          dropdownOffset={{top: 0, left: 0}}
          inputContainerStyle={{
            borderBottomColor: '#F18921',
            borderBottomWidth: 1.5,
            //  backgroundColor: 'green',
          }}
          containerStyle={
            {
              //  backgroundColor: 'red',
            }
          }
          onChangeText={value => {}}
          data={ALLSTATE.map(i => ({label: i, value: i}))}
        />
        <Dropdown
          placeholder="State of Origin"
          //   dropdownOffset={{top: 0, left: 0}}
          inputContainerStyle={{
            borderBottomColor: '#F18921',
            borderBottomWidth: 1.5,
            //  backgroundColor: 'green',
          }}
          containerStyle={
            {
              //  backgroundColor: 'red',
            }
          }
          onChangeText={value => {}}
          data={ALLSTATE.map(i => ({label: i, value: i}))}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
            bottom: 0,
            width: '100%',
          }}>
          <Back onPress={props.navigation.goBack} />
          <Next onPress={() => props.navigation.navigate('NextOfKin')} />
        </View>

        {showBirthDay && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowBirthDay(false);
              setDate(currentDate);
              console.log(event, selectedDate);
            }}
          />
        )}
      </ScrollView>
    </Bgcover>
  );
};

export default NextOfKin;
