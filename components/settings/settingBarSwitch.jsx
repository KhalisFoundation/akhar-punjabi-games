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
import * as Analytics from 'expo-firebase-analytics';

function SwitchBar({
  title,
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

  async function setting_used(setup) {
    await Analytics.logEvent('setting_used', { setting_used: setup });
  }

  return (
    <View>
      <ListItem
        key={theSetting}
        containerStyle={[
          styles.titleText,
          { alignItems: 'flex-start' },
          displayParam ? null : { display: 'none' }
        ]}
        bottomDivider
      >
        <MaskedView
          style={{ width: 35, height: 35, alignSelf: 'center' }}
          maskElement={(
            <View
              style={{
                backgroundColor: 'transparent',
              }}
            >
              <Icon name={allImages[imageSource]} size={35} color={'#000'} style={styles.shadow} />
            </View>
        )}
        >
          <LinearGradient
            colors={['#274CCC', '#274C77']}
            style={{ flex: 1 }}
          />
        </MaskedView>
        <ListItem.Content style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <ListItem.Title style={{ alignSelf: 'center' }}>{theSetting}</ListItem.Title>
          <Switch
            value={currentSetting}
            onValueChange={(newSetting) => {
              dispatch(theAction(newSetting));
              setCurrentSetting(newSetting);
              setting_used(`${title} set to ${newSetting ? 'on' : 'off'}`);
            }}
          />
        </ListItem.Content>
      </ListItem>
    </View>
  );
}

export default SwitchBar;
