/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { ListItem, BottomSheet, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';

function SettingsBar({
  theSetting, imageSource, theList, theAction
}) {
  const dispatch = useDispatch();
  const allImages = {
    khalislogo150: require('../images/khalislogo150.png'),
    khanda: require('../images/khanda.png'),
    ikOngkar: require('../images/ikOngkar.png'),
  };
  const list = theList.map((theTitle) => {
    return {
      title: theTitle,
      onPress: () => {
        setCurrentSetting(theTitle);
        setIsVisible(false);
      },
    };
  });

  list.push({
    title: 'Cancel',
    containerStyle: { backgroundColor: 'red' },
    titleStyle: { color: 'white' },
    onPress: () => setIsVisible(false),
  });
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState(list[0].title);

  dispatch(theAction(currentSetting));
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingBar}
        onPress={() => {
          setIsVisible((prev) => {
            // sets isVisible to true
            return !prev;
          });
        }}
      >
        <Image style={styles.image} source={allImages[imageSource]} />
        <Text style={styles.text1}>{theSetting}</Text>

        <View style={styles.rightSide}>
          <Text style={styles.text2}>{currentSetting}</Text>
          <Icon name="chevron-right" style={styles.icon} />
        </View>
      </TouchableOpacity>

      <BottomSheet
        modalProps={{
          animationType: 'slide',
          visible: isVisible,
          backgroundColor: 'blue',
          transparent: true,
          onRequestClose: () => {
            setIsVisible((prev) => !prev);
          },
        }}
        // containerStyle={{ backgroundColor: "rgba(0.5, 0.25, 0, 0.2)" }}
      >
        {list.map((item) => (
          <ListItem
            key={item.title}
            containerStyle={item.containerStyle}
            onPress={item.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={item.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
}

// TODO - Move all colors to separate file and import as variables.
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  settingBar: {
    flexDirection: 'row',
    width: '100%',
    height: '99%',
    backgroundColor: 'white',
    // paddingLeft: 20,
  },
  image: {
    // flex: 1,
    width: '30%',
    height: '100%',
  },
  text1: {
    flex: 1,
  },
  rightSide: {
    flex: 1,
    flexDirection: 'row',
  },
  text2: {
    // flex: 1,
  },
  icon: {
    // flex: 1,
  },
});

export default SettingsBar;
