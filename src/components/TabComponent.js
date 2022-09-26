import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  BLUE,
  CREAM,
  DARK_PINK,
  DARK_RED,
  LIGHT_PINK,
  WHITE,
} from '../constants/strings';

const TabComponent = props => {
  console.log('bool', props.selected);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: props.selected ? BLUE : CREAM},
      ]}
      onPress={props.handleOnPress}>
      <Text style={[styles.text, {color: props.selected ? WHITE : DARK_RED}]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1.5),
    marginHorizontal: wp(2),
    marginTop: hp(2),
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
  },
  text: {
    fontSize: hp(2),
    fontWeight: 'bold',
  },
});

export default TabComponent;
