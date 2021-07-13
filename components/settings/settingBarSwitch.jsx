/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import { Switch } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';

import theColors from '../../util/colors';

function SwitchBar({
  theSetting,
  imageSource,
  theList,
  theAction,
  theCurrentOptionIndex,
}) {
  const dispatch = useDispatch();

  const state = useSelector((theState) => theState.theGameReducer);
  const colors = theColors[state.darkMode];
  const styles = StyleSheet.create({
    container: {
      height: 50,
    },
    settingBar: {
      flexDirection: 'row',
      width: '100%',
      height: '99%',
      backgroundColor: colors.settingBar.settingBar,
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
  const allImages = {
    khalislogo150: require('../../images/khalislogo150.png'),
    khanda: require('../../images/khanda.png'),
    ikOngkar: require('../../images/ikOngkar.png'),
  };
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState(
    theList[theCurrentOptionIndex]
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingBar}>
        <Image style={styles.image} source={allImages[imageSource]} />
        <Text style={styles.text1}>{theSetting}</Text>

        <View style={styles.rightSide}>
          <Text style={styles.text2}>{currentSetting}</Text>
          <Switch
            value={isVisible}
            onValueChange={() => {
              setIsVisible((prev) => {
                // index 0 is Off and index 1 is On
                let theTitle;
                if (!prev === true) {
                  theTitle = 'On';
                } else {
                  theTitle = 'Off';
                }
                dispatch(theAction(theTitle));
                setCurrentSetting(theTitle);

                return !prev;
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default SwitchBar;
