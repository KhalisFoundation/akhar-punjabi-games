import { useSelector } from 'react-redux';
import { Text } from 'react-native';
import { useFonts } from 'expo-font';
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import AppLoading from 'expo-app-loading';

export const NumText = ({ num }) => {
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    GurbaniHeavy: require('../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Muli: require('../../../assets/fonts/Muli.ttf')
  });
  const styles = {
    textAlign: 'center',
    color: '#002f63',
    fontFamily: (state.punjabiNums) ? 'GurbaniHeavy' : 'Muli',
    fontSize: (num >= 128) ? 25 : 30
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Text style={{
      ...styles
    }}
    >
      {(state.punjabiNums) ? Anvaad.unicode(num) : num}
    </Text>
  );
};
