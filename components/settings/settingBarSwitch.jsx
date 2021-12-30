/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import { ListItem, Switch } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
    settingBar: {
      flexDirection: 'row',
      width: '100%',
      height: '99%',
      backgroundColor: colors.settingBar.settingBar,
      borderColor: colors.settingBar.border,
      borderWidth: 1,
    },
    image: {
      width: '10%',
      height: '100%',
      margin: 10,      
      alignItems: 'center',
    },
    text1: {
      flex: 1,
      margin: 10,
      alignSelf: 'center',
    },
    rightSide: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text2: {
      // flex: 1,
    },
    icon: {
      // flex: 1,
    },
  });
  const allImages = {
    khalislogo150: 'book',
    khanda: 'brightness-high',
    ikOngkar: 'notifications',
  };
  // const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState(
    theList[theCurrentOptionIndex]
  );
  if (String(currentSetting) == 'false') {
    allImages['khanda'] = 'brightness-high' 
  } else {
    allImages['khanda'] = 'nights-stay'
  }

  return (
    <View style={styles.container}>
      <ListItem 
        key={theSetting}
        containerStyle={[
          styles.titleText,
          state.darkMode && { backgroundColor: "#464646" },
          {alignItems: 'flex-start'}
        ]}
        bottomDivider>
        <Icon name={allImages[imageSource]} size={35} color={state.darkMode ? "#fff" : "#464646"}/>
        <ListItem.Content>
          <ListItem.Title style={state.darkMode && { color: "#fff" }}>{theSetting}</ListItem.Title>
        </ListItem.Content>
        <Switch
            style={styles.rightSide}
            value={currentSetting}
            onValueChange={(newSetting) => {
              dispatch(theAction(newSetting));
              setCurrentSetting(newSetting);
            }}
          />
      </ListItem>
    </View>
  );
}

export default SwitchBar;
