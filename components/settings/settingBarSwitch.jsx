/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, StyleSheet
} from 'react-native';
import { ListItem, Switch } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function SwitchBar({
  theSetting,
  imageSource,
  theList,
  theAction,
  theCurrentOptionIndex,
  displayParam = true
}) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);
  const styles = StyleSheet.create({
    shadow: {
      shadowColor: 'black',
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
  });
  const allImages = {
    khanda: 'brightness-high',
    ikOngkar: 'cards-outline',
    ura: 'alphabetical',
    letters: 'counter',
    matra: 'image-filter-tilt-shift'
  };
  // const [isVisible, setIsVisible] = React.useState(false);
  const [currentSetting, setCurrentSetting] = React.useState(
    theList[theCurrentOptionIndex]
  );
  if (String(currentSetting) === 'false') {
    allImages.khanda = 'brightness-5';
  } else {
    allImages.khanda = 'brightness-2';
  }

  return (
    <View>
      <ListItem
        key={theSetting}
        containerStyle={[
          styles.titleText,
          state.darkMode && { backgroundColor: '#464646' },
          { alignItems: 'flex-start'},
          displayParam ? null : {display:'none'}
        ]}
        bottomDivider
      >
        <MaskedView
          style={{ width: 35, height: 35, alignSelf:'center' }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Icon name={allImages[imageSource]} size={35} color={state.darkMode ? '#fff' : '#000'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={state.darkMode ? ['#ff8008', '#ffc837'] : ['#FF0076', '#590FB7']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ListItem.Title style={[state.darkMode && { color: '#fff' }, {alignSelf:'center'}]}>{theSetting}</ListItem.Title>
          <Switch
            value={currentSetting}
            onValueChange={(newSetting) => {
              dispatch(theAction(newSetting));
              setCurrentSetting(newSetting);
            }}
          />
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

export default SwitchBar;
