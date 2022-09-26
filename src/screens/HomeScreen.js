import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {CREAM, DARK_RED} from '../constants/strings';
import TabComponent from '../components/TabComponent';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TextTab from '../components/TextTab';
import NotifyTab from '../components/NotifyTab';
import PhotoTab from '../components/PhotoTab';
import CalculatorTab from '../components/CalculatorTab';

const HomeScreen = () => {
  const [selected, setSelected] = useState('NOTIFY');
  const handleOnPress = item => {
    console.log(item + 'Pressed');
    setSelected(item);
    console.log(selected);
  };

  const tabData = ['NOTIFY', 'PHOTO', 'TEXT', 'CALCULATE'];

  const renderTabScreen = () => {
    if (selected == 'NOTIFY') {
      return <NotifyTab />;
    } else if (selected == 'PHOTO') {
      return <PhotoTab />;
    } else if (selected == 'TEXT') {
      return <TextTab />;
    } else {
      return <CalculatorTab />;
    }
  };

  return (
    <SafeAreaView style={styles.topContainer}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={tabData}
        keyExtractor={(item, index) => item.toString()}
        renderItem={({item}) => (
          <TabComponent
            name={item}
            handleOnPress={handleOnPress.bind(this, item)}
            selected={selected === item}
          />
        )}
        contentContainerStyle={{alignItems: 'flex-start', borderWidth: 2}}
      />
      <View style={styles.tabContainer}>{renderTabScreen()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {backgroundColor: CREAM, flex: 1, paddingTop: hp(2)},
  tabContainer: {
    height: hp(82),
    borderTopColor: DARK_RED,
    borderTopWidth: 1,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
  },
});

export default HomeScreen;
