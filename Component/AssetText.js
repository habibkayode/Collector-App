import React from 'react';
import {View, Text} from 'react-native';
import AssetHeader from './Header/AssetHeader';

const AssetText = props => {
  return (
    <>
      {props.header ? <AssetHeader text={props.header} /> : null}
      <Text style={{fontSize: 16, lineHeight: 22, textAlign: 'justify'}}>
        {props.body}
      </Text>
    </>
  );
};

export default AssetText;
