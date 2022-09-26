import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  BLACK,
  BLUE,
  CREAM,
  imageUploading,
  LIGHT_PINK,
  WHITE,
} from '../constants/strings';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CameraIcon, PhoneIcon, PhotoIcon} from 'react-native-heroicons/solid';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../Auth/AuthenticationProvider';
import AnimatedLottieView from 'lottie-react-native';

const TextTab = () => {
  const [text, setText] = useState(null);
  const {user} = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const postText = () => {
    if (text == null) {
      return;
    }
    setLoading(true);
    firestore()
      .collection('text')
      .add({
        userId: user.uid,
        text: text,
      })
      .then(() => {
        Alert.alert('Text Uploaded');
        setLoading(false);
      });
  };

  const getText = () => {
    setLoading(true);
    firestore()
      .collection('text')
      .where('userId', '==', user.uid)
      .get()
      .then(e => {
        setData(e.docs);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        {data && (
          <View style={styles.renderButton}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => item.toString()}
              renderItem={({item}) => {
                return <Text style={styles.renderText}>{item._data.text}</Text>;
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.bottomContainer}>
        {loading && (
          <AnimatedLottieView
            autoPlay
            loop
            source={imageUploading}
            style={{
              height: heightPercentageToDP(10),
              widthPercentageToDP: widthPercentageToDP(20),
            }}
          />
        )}
        <View style={styles.userInput}>
          <TextInput
            placeholderTextColor={BLACK}
            placeholder="Write something"
            style={styles.textinput}
            onChangeText={pass => {
              setText(pass);
            }}
            value={text}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => postText()}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => getText()}>
          <Text style={styles.buttonText}>Get</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CREAM,
    flex: 1,
  },
  topContainer: {
    flex: 6,
  },
  bottomContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: heightPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
  },
  button: {
    backgroundColor: BLUE,
    height: heightPercentageToDP(6),
    width: widthPercentageToDP(40),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),
  },
  buttonText: {
    fontSize: heightPercentageToDP(3),
    fontWeight: 'bold',
    color: WHITE,
  },
  userInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    height: heightPercentageToDP(6),
    width: widthPercentageToDP(80),
    marginHorizontal: widthPercentageToDP(10),
    marginBottom: heightPercentageToDP(2),
    borderRadius: 5,
  },
  textinput: {
    marginLeft: widthPercentageToDP(2),
    color: BLACK,
  },
  renderButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  renderText: {
    marginVertical: widthPercentageToDP(2),
    paddingVertical: heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(10),
    borderRadius: 10,
    backgroundColor: LIGHT_PINK,
    fontSize: heightPercentageToDP(2),
    fontWeight: 'bold',
  },
});

export default TextTab;
