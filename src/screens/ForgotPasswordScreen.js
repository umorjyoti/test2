import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  authLoader,
  BLACK,
  BLUE,
  CREAM,
  forgotPassanimation,
  warninganimation,
  WHITE,
} from '../constants/strings';
import LottieView from 'lottie-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AuthContext} from '../Auth/AuthenticationProvider';
import {UserIcon} from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [resetEmail, setResetEmail] = useState();
  const {animation, passwordReset, loader} = useContext(AuthContext);
  const navigation = useNavigation();
  const handleReset = () => {
    try {
      passwordReset(resetEmail);
      loader && navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={
          animation === 'Welcome' ? forgotPassanimation : warninganimation
        }
        autoPlay
        loop
        style={styles.animation}
      />
      <View style={styles.userInput}>
        <View style={styles.icon}>
          <UserIcon size={25} color={BLACK} />
        </View>

        <TextInput
          placeholderTextColor={BLACK}
          placeholder="Email"
          style={styles.textinput}
          onChangeText={e => {
            setResetEmail(e);
          }}
          value={resetEmail}
        />
      </View>
      <TouchableOpacity onPress={handleReset} style={styles.signinButton}>
        {!loader ? (
          <Text style={styles.signup}>Reset Password</Text>
        ) : (
          <LottieView source={authLoader} autoPlay loop style={styles.loader} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CREAM,
    alignItems: 'center',
  },
  animation: {
    height: hp(30),
    width: wp(50),
  },
  userInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: hp(6),
    width: wp(80),
    marginHorizontal: wp(10),
    marginBottom: hp(2),
    borderRadius: 5,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    width: wp(10),
    height: hp(6),
  },
  textinput: {
    marginLeft: wp(2),
    color: BLACK,
  },
  signinButton: {
    borderRadius: 5,
    width: wp(80),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BLUE,
    marginBottom: hp(2),
  },
  signup: {
    fontSize: hp(2.3),
    fontWeight: '600',
    color: WHITE,
    letterSpacing: 0.2,
  },
  loader: {
    height: hp(20),
  },
});

export default ForgotPasswordScreen;
