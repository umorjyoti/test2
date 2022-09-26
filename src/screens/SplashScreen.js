import {View, Text, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {LIGHT_PINK, splashAnimation} from '../constants/strings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PushNotification from 'react-native-push-notification';
import {AuthContext} from '../Auth/AuthenticationProvider';

const SplashScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const createChannel = () => {
    PushNotification.createChannel({
      channelId: 'app-channel',
      channelName: 'AppChannel',
    });
  };

  useEffect(() => {
    createChannel();
  });

  useEffect(() => {
    setTimeout(() => {
      user ? navigation.navigate('Home') : navigation.navigate('SignIn');
    }, 3000);
  });
  return (
    <View style={styles.container}>
      <LottieView
        source={splashAnimation}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: LIGHT_PINK,
  },
  animation: {
    height: hp(40),
  },
});

export default SplashScreen;
