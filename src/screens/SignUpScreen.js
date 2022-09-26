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
  GREEN,
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
import {validate} from 'react-email-validator';

let strongPassword = new RegExp(
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
);
let mediumPassword = new RegExp(
  '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))',
);

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [error, setError] = useState();
  const [passwordColor, setPasswordColor] = useState(BLACK);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {register, animation, setAnimation, loader, handleAnimation} =
    useContext(AuthContext);

  function StrengthChecker(PasswordParameter) {
    if (strongPassword.test(PasswordParameter)) {
      setPasswordColor(GREEN);
      setPasswordStrength('Strong');
    } else if (mediumPassword.test(PasswordParameter)) {
      setPasswordColor(BLUE);
      setPasswordStrength('Medium');
    } else {
      handleAnimation();
      setPasswordColor(RED);
      setPasswordStrength('Weak');
    }
  }

  const handleSignUp = () => {
    StrengthChecker(password);
    if (!email || !password || !confirmPass) {
      setError('Fields cannot be empty');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    } else if (password.length < 8) {
      setError('Passwords cannot be less than 8 characters');
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    if (password === confirmPass) {
      validate(email)
        ? register(email, password)
        : (setError('Please enter a valid email'),
          setTimeout(() => {
            setError(null);
          }, 2000));
    } else {
      setAnimation('Warning');
      setTimeout(() => {
        setAnimation('Welcome');
      }, 2000);
    }
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
          style={[styles.textinput, {color: BLACK}]}
          onChangeText={e => {
            setEmail(e);
          }}
          value={email}
        />
      </View>
      <View style={[styles.userInput, {borderColor: passwordColor}]}>
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
      <View style={[styles.userInput, {borderColor: passwordColor}]}>
        <View style={styles.icon}>
          <LockClosedIcon size={25} color={BLACK} />
        </View>

        <TextInput
          placeholderTextColor={BLACK}
          placeholder="Confirm Password"
          style={styles.textinput}
          onChangeText={pass => {
            setConfirmPass(pass);
          }}
          value={confirmPass}
        />
      </View>
      <TouchableOpacity onPress={handleSignUp} style={styles.signinButton}>
        {!loader ? (
          <Text style={styles.signup}>Sign Up</Text>
        ) : (
          <LottieView source={authLoader} autoPlay loop style={styles.loader} />
        )}
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
      <TouchableOpacity style={styles.signinWith}>
        <View style={styles.rightcontianer}>
          <Text style={styles.ficon}>G</Text>
        </View>

        <View style={styles.leftContainer}>
          <Text style={styles.facebooktext}>Sign Up With Google</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.forgotPass}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.forgotPassText}>Have an account? Sign In</Text>
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
    marginBottom: hp(1),
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
    marginBottom: hp(7),
  },
  loader: {
    height: hp(20),
  },
});

export default SignUpScreen;
