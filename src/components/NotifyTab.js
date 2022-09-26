import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CREAM, DARK_PINK, DARK_RED, RED, WHITE} from '../constants/strings';
import {AuthContext} from '../Auth/AuthenticationProvider';

const NotifyTab = () => {
  const {logout} = useContext(AuthContext);

  const handleOnPress = () => {
    PushNotification.localNotification({
      channelId: 'app-channel',
      title: 'Welcome Notificaiton',
      message: 'Thanks for your time',
    });
  };
  const handlelogOut = () => {
    logout();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlelogOut} style={styles.logOutbutton}>
        <Text style={styles.logOutbuttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CREAM,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: RED,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 10,
  },
  buttonText: {
    color: WHITE,
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  logOutbutton: {
    height: hp(6),
    width: wp(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DARK_PINK,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
  },
  logOutbuttonText: {
    fontSize: hp(2),
    fontWeight: '600',
    color: WHITE,
  },
});

export default NotifyTab;
