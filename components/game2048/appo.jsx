import * as React from 'react';
import { useEffect } from 'react';
import {
  Platform,
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Container from './components/Container';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import Dimensions from '../../util/dimensions';
import { openHelpModal } from '../../redux/actions';
import Help from './components/help';

export default function New2048({ navigation }) {
  const dispatch = useDispatch();
  const state = useSelector((theState) => theState.theGameReducer);

  const {height, width} = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.container}>
      { state.helpPage ? <Help /> : null } 
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View
        style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>  
        <TouchableOpacity
          style={styles.back}
          onPressOut={() => navigation.goBack()}
        >
        <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="arrow-back" size={35} color={'#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={['#ff8008', '#ffc837']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.help}
          onPressOut={() => {dispatch(openHelpModal());}}
        >
        <MaskedView
            style={{ width: 35, height: 35 }}
            maskElement={(
              <View
                style={{
                  backgroundColor: 'transparent',
                  alignItems: 'center',
                }}
              >
                <IonIcons name="help" size={35} color={'#464646'} style={styles.shadow} />
              </View>
          )}
          >
            <LinearGradient
              colors={['#ff8008', '#ffc837']}
              style={{ flex: 1 }}
            />
          </MaskedView>
        </TouchableOpacity>
      </View>
      <Container startTiles={2} size={4} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#274C7C",
    paddingHorizontal: Dimensions.size["5"],
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
    headingTitle:{
      fontSize:Dimensions.size["12"],
      color: '#776E65',
    },
    back: {
      backgroundColor: '#035',
      padding: Dimensions.size["4"],
      borderRadius: 50,
      marginTop: 15,
    },
    help: {
      backgroundColor: '#035',
      padding: Dimensions.size["4"],
      borderRadius: 50,
      marginTop: 15,
    },
    upBox: {
      backgroundColor: '#035',
      padding: Dimensions.size["4"],
      borderRadius: 50,
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 15,
    },
    upText: {
      color: 'white',
      fontSize: 15,
      fontFamily: 'Muli',
    }
});
