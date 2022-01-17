/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { Avatar, ListItem, BottomSheet, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from "expo-linear-gradient";

import theColors from '../../util/colors';

function SettingsBar({
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
      // flex: 1,
      width: '100%',
      height: '100%',
      margin: 10,      
      alignSelf: 'center',
    },
    text1: {
      flex: 1,
      margin: 10,
      alignSelf: 'center',
      color: 'black',
    },
    titleText:{
      color:'black'
    },
    rightSide: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    shadow: {
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
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
    khanda: 'khanda',
    ikOngkar: 'bell',
  };
  const list = theList.map((theTitle) => {
    return {
      title: String(theTitle),
      onPress: () => {
        setCurrentSetting(String(theTitle));
        setIsVisible(false);
        dispatch(theAction(theTitle));
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
  const [currentSetting, setCurrentSetting] = React.useState(
    String(list[theCurrentOptionIndex].title)
  );
  // dispatch(theAction(currentSetting));
  // why does this cause it it craxh
  return (
    <View style={styles.container}>
      <ListItem 
        key={theSetting}
        containerStyle={[
          styles.titleText,
          state.darkMode && { backgroundColor: "#464646" },
          {alignItems: 'flex-start'}
        ]}
        onPress={() => {
          setIsVisible((prev) => {
            // sets isVisible to true
            return !prev;
          });
        }}
        bottomDivider>
          <MaskedView
          style={{width:35,height: 35 }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Icon name={allImages[imageSource]} size={35} color={state.darkMode ? "#fff" : "#464646"} style={styles.shadow}/>
            </View>
          }>
          <LinearGradient
            colors={state.darkMode? ["#ff8008", "#ffc837"]: ["#FF0076", "#590FB7"]}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <ListItem.Content>
          <ListItem.Title style={state.darkMode && { color: "#fff" }}>{theSetting}</ListItem.Title>
          <ListItem.Subtitle style={{ color: state.darkMode ? "#fff" : "#a3a3a3" }}>{currentSetting}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron color={state.darkMode ? 'white' : 'black'} />
      </ListItem>
      
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

export default SettingsBar;
