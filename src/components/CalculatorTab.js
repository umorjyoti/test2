import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {BLACK, CREAM, imageUploading, RED, WHITE} from '../constants/strings';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'react-native-axios';
import AnimatedLottieView from 'lottie-react-native';

const CalculatorTab = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [value, setValue] = useState('+');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const data = [
    {label: 'plus', value: '+'},
    {label: 'minus', value: '-'},
    {label: 'multiply', value: '*'},
  ];

  const handleOnPress = () => {
    postData();
  };

  const postData = () => {
    try {
      setLoading(true);
      axios
        .post('https://calculatortestumor.herokuapp.com/', {
          num1: num1,
          num2: num2,
          operation: value,
        })
        .then(function (response) {
          setResult(response.data.result);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.fields}>
        <TextInput
          style={styles.input}
          placeholder="num"
          keyboardType="decimal-pad"
          value={num1.toString()}
          onChangeText={num => setNum1(num)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select"
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="num"
          keyboardType="decimal-pad"
          value={num2.toString()}
          onChangeText={num => setNum2(num)}
        />
      </View>
      <View style={styles.result}>
        {loading && (
          <AnimatedLottieView
            autoPlay
            loop
            source={imageUploading}
            style={styles.loading}
          />
        )}
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleOnPress}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {height: heightPercentageToDP(10), width: widthPercentageToDP(30)},
  container: {
    backgroundColor: CREAM,
    flex: 1,
  },
  fields: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    width: wp(20),
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: hp(2),
    color: BLACK,
  },
  result: {flex: 1, alignItems: 'center'},
  resultText: {
    fontSize: hp(4),
    fontWeight: 'bold',
    color: BLACK,
  },
  button: {
    backgroundColor: RED,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: hp(5),
    marginHorizontal: wp(20),
  },
  buttonText: {
    color: WHITE,
    fontSize: hp(2.5),
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 2,
    borderRadius: 10,
    height: hp(7),
    width: wp(30),
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    marginBottom: hp(1),
    paddingHorizontal: wp(3),
  },
  operation: {
    fontSize: hp(4),
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'center',
    borderRightWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
    color: BLACK,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: BLACK,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CalculatorTab;
