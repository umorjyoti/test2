import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import {
  authLoader,
  BLACK,
  BLUE,
  CREAM,
  LIGHT_PINK,
  RED,
  singupanimation,
  warninganimation,
  WHITE,
} from '../constants/strings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  LockClosedIcon,
  SparklesIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import {AuthContext} from '../Auth/AuthenticationProvider';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);

  const {login, animation, setAnimation, loader} = useContext(AuthContext);

  const handleSignIn = () => {
    if (!email || !password) {
      setError('Fields cannot be empty');
      return;
    }
    login(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        source={animation === 'Welcome' ? singupanimation : warninganimation}
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
            setEmail(e);
          }}
          value={email}
        />
      </View>
      <View style={styles.userInput}>
        <View style={styles.icon}>
          <LockClosedIcon size={25} color={BLACK} />
        </View>

        <TextInput
          placeholderTextColor={BLACK}
          placeholder="Password"
          style={styles.textinput}
          onChangeText={pass => {
            setPassword(pass);
          }}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={handleSignIn} style={styles.signinButton}>
        {!loader ? (
          <Text style={styles.signup}>Sign In</Text>
        ) : (
          <LottieView source={authLoader} autoPlay loop style={styles.loader} />
        )}
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.forgotPass}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.signinWith}>
        <View style={styles.rightcontianer}>
          <Text style={styles.ficon}>G</Text>
        </View>

        <View style={styles.leftContainer}>
          <Text style={styles.facebooktext}>Sign In With Google</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.forgotPass}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.forgotPassText}>
            Don't have an account? Create here
          </Text>
        </TouchableOpacity>
      </View>
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
    top: hp(-1),
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
    marginTop: hp(2),
  },
  signup: {
    fontSize: hp(2.3),
    fontWeight: '600',
    color: WHITE,
    letterSpacing: 0.2,
  },
  forgotPass: {
    width: wp(80),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(5),
  },
  forgotPassText: {
    color: BLUE,
    fontSize: hp(1.8),
    fontWeight: '700',
  },
  signinWith: {
    flexDirection: 'row',
    height: hp(6),
    width: wp(80),
    backgroundColor: LIGHT_PINK,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: hp(2),
  },
  rightcontianer: {
    height: hp(6),
    width: wp(10),
    borderRightWidth: 1,
    borderRightColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ficon: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    color: BLUE,
  },
  leftContainer: {
    height: hp(6),
    width: wp(70),
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebooktext: {
    fontSize: hp(1.8),
    color: BLUE,
    fontWeight: '400',
  },
  error: {
    color: RED,
  },
  loader: {
    height: hp(20),
  },
});

export default SignInScreen;
