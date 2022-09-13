import { useDispatch, useSelector } from "react-redux";
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as React from 'react';
import * as Anvaad from 'anvaad-js';

const styles = {
      textAlign: 'center',
      color: '#000',
};
export const NumText = ({ num, style = styles }) => {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);
    const [fontLoaded] = useFonts({
        GurbaniHeavy: require('../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
        Bookish: require('../../../assets/fonts/Bookish.ttf'),
        Mochy: require('../../../assets/fonts/Mochy.ttf'),
        Muli: require('../../../assets/fonts/Muli.ttf'),
        Nasa: require('../../../assets/fonts/Nasalization.otf'),
        Prabhki: require('../../../assets/fonts/Prabhki.ttf'),
      });

    return (<Text style={{...style,
      fontFamily: (state.punjabiNums) ? 'GurbaniHeavy' : 'Muli',
      fontSize: (num>=128) ? 25 : 30}}>{(state.punjabiNums) ? Anvaad.unicode(num) : num}</Text>)
}