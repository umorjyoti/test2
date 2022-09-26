import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  authLoader,
  BLACK,
  BLUE,
  CREAM,
  DARK_PINK,
  LIGHT_PINK,
  ORANGE,
  WHITE,
  imageUploading,
} from '../constants/strings';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CameraIcon, PhoneIcon, PhotoIcon} from 'react-native-heroicons/solid';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/firestore';
import {AuthContext} from '../Auth/AuthenticationProvider';
import AnimatedLottieView from 'lottie-react-native';
const PhotoTab = () => {
  const [documentIndex, setDocumentIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  let blobFile;

  const {user} = useContext(AuthContext);

  function blobToDataUrl(blob) {
    return new Promise(r => {
      let reader = new FileReader();
      reader.onload = r;
      reader.readAsDataURL(blob);
    }).then(e => e.target.result);
  }

  const deleteImage = () => {
    setUploading(true);
    firestore()
      .collection('image')
      .doc(`${currentImageId}`)
      .delete()
      .then(() => {
        Alert.alert('Image deleted');
        setUploadedImage(null);
        setUploading(false);
      });
  };

  const replace = async () => {
    setUploadedImage(null);
    if (image == null) {
      return;
    }

    const response = await fetch(image);
    const blob = await response.blob();
    blobFile = await blobToDataUrl(blob);

    firestore()
      .collection('image')
      .doc(`${currentImageId}`)
      .update({
        img: blobFile,
      })
      .then(() => {
        Alert.alert('Image replaced');
        getImage();
      });
  };

  const getImage = async () => {
    firestore()
      .collection('image')
      .where('userId', '==', user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(item => {
          if (item._data.img === blobFile) {
            setUploadedImage(item._data.img);
            console.log('Item', item.id);
            setCurrentImageId(item.id);
          }
        });
        setUploading(false);
      });
  };

  const postPictureToFirebase = async () => {
    setUploadedImage(null);
    if (image == null) {
      return;
    }
    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();
    blobFile = await blobToDataUrl(blob);

    firestore()
      .collection('image')
      .add({
        userId: user.uid,
        img: blobFile,
        index: documentIndex,
      })
      .then(() => {
        // console.log('Image Uploaded');
        Alert.alert('Image Uploaded');
        setImage(null);

        getImage();
      });
  };

  const pickFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 1200,
      height: 700,
      cropping: true,
    }).then(image => {
      // console.log(image);
      setImage(image.path);
    });
  };
  const posthelper = () => {
    setDocumentIndex(Math.random());
    postPictureToFirebase();
  };

  const pickFromGallery = () => {
    ImageCropPicker.openPicker({
      width: 1200,
      height: 700,
      cropping: true,
    }).then(image => {
      setImage(image.path);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>{documentIndex}</Text>
        {uploading && (
          <AnimatedLottieView
            source={imageUploading}
            style={styles.loader}
            autoPlay
            loop
          />
        )}
        {uploadedImage && (
          <>
            <Image
              style={styles.image}
              source={{uri: uploadedImage}}
              resizeMode="contain"
            />
            {/* <View style={styles.removeButtonContainer}>
              <TouchableOpacity
                onPress={deleteImage}
                style={styles.removebutton}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={replace} style={styles.removebutton}>
                <Text style={styles.removeText}>Replace</Text>
              </TouchableOpacity>
            </View> */}
          </>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => pickFromCamera()}
          style={[styles.cameraButton, {right: widthPercentageToDP(60)}]}>
          <CameraIcon size={22} color={WHITE} />
          <Text style={styles.cameraText}>Use Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => pickFromGallery()}
          style={[styles.cameraButton, {right: widthPercentageToDP(6)}]}>
          <CameraIcon size={22} color={WHITE} />
          <Text style={[styles.cameraText]}>Pick From Gallery</Text>
        </TouchableOpacity>
        {image && (
          <>
            <Image
              source={{uri: image}}
              style={styles.imageBottom}
              resizeMode="contain"
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  {marginRight: widthPercentageToDP(5)},
                ]}
                onPress={posthelper}>
                <Text style={styles.uploadTextButton}>Upload New</Text>
              </TouchableOpacity>
              {uploadedImage && (
                <TouchableOpacity style={styles.uploadButton} onPress={replace}>
                  <Text style={styles.uploadTextButton}>Replace</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: heightPercentageToDP(10),
    width: widthPercentageToDP(20),
  },
  container: {
    backgroundColor: CREAM,
    flex: 1,
  },
  topContainer: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_PINK,
    borderRadius: 10,
  },
  bottomContainer: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: BLUE,
    height: heightPercentageToDP(6),
    width: heightPercentageToDP(6),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),
  },
  buttonText: {
    fontSize: heightPercentageToDP(3),
    fontWeight: 'bold',
    color: WHITE,
  },
  selectButton: {
    backgroundColor: BLACK,
    height: heightPercentageToDP(6),
    width: heightPercentageToDP(6),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: heightPercentageToDP(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectButtonText: {
    marginRight: widthPercentageToDP(3),
    fontSize: heightPercentageToDP(1.8),
    fontWeight: 'bold',
  },
  image: {
    height: heightPercentageToDP(30),
    width: widthPercentageToDP(100),
  },
  removeButtonContainer: {
    marginTop: heightPercentageToDP(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthPercentageToDP(100),
  },
  removebutton: {
    flex: 1,
    height: heightPercentageToDP(6),
    marginHorizontal: widthPercentageToDP(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: BLUE,
  },
  removeText: {
    fontSize: heightPercentageToDP(1.9),
    fontWeight: 'bold',
    color: WHITE,
  },
  buttonPost: {
    height: heightPercentageToDP(5),
    width: widthPercentageToDP(30),
    backgroundColor: BLUE,
    marginTop: widthPercentageToDP(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  postText: {
    fontSize: heightPercentageToDP(2.2),
    fontWeight: 'bold',
    color: WHITE,
  },
  cameraButton: {
    height: heightPercentageToDP(5),
    // width: widthPercentageToDP(35),
    flexDirection: 'row',
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: widthPercentageToDP(3),
    borderRadius: 5,
    position: 'absolute',
    top: heightPercentageToDP(-2.5),
    zIndex: 5,
  },
  cameraText: {
    fontWeight: 'bold',
    fontSize: heightPercentageToDP(1.8),
    marginLeft: widthPercentageToDP(3),
    color: WHITE,
  },
  imageBottom: {
    height: heightPercentageToDP(20),
    width: widthPercentageToDP(100),
  },
  uploadButton: {
    height: heightPercentageToDP(6),
    width: widthPercentageToDP(40),
    zIndex: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ORANGE,
    borderRadius: 5,
    marginTop: heightPercentageToDP(2),
  },
  uploadTextButton: {
    color: WHITE,
    fontSize: heightPercentageToDP(2),
    fontWeight: 'bold',
  },
});

export default PhotoTab;
