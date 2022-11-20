import { useDispatch, useSelector } from "react-redux";
import { Text, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import * as React from 'react';
import * as Anvaad from 'anvaad-js';
import AppLoading from "expo-app-loading";

const styles = {
      textAlign: 'center',
      color: '#002f63',
};
export const NumText = ({ num, style = styles }) => {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);
    const [fontsLoaded] = useFonts({
        GurbaniHeavy: require('../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
        Muli: require('../../../assets/fonts/Muli.ttf')
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    }

    return (<Text style={{...style,
      fontFamily: (state.punjabiNums) ? 'GurbaniHeavy' : 'Muli',
      fontSize: (num>=128) ? 25 : 30}}>{(state.punjabiNums) ? Anvaad.unicode(num) : num}</Text>)
}