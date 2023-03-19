/* eslint-disable react-native/no-raw-text */
/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-animatable';
import HelpImg1 from '../../../assets/helpGrid1.svg';
import HelpImg2 from '../../../assets/helpGrid2.svg';
import HelpImg3 from '../../../assets/helpGrid3.svg';

import Dimensions from '../../../util/dimensions';
import { close2048HelpModal } from '../../../redux/actions';

const { width } = Dimensions.get('window');

function Help() {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    Muli: require('../../../assets/fonts/Muli.ttf'),
    Bookish: require('../../../assets/fonts/Prabhki.ttf')
  });

  const styles = StyleSheet.create({
    modal: { flex: 1 },
    externalBg: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    container: {
      flex: 1,
      alignSelf: 'center',
      borderRadius: 15,
      padding: 15,
      marginVertical: 40,
      width: '90%',
      backgroundColor: '#7FC8DE',
    },
    img: {
      alignSelf: 'center',
    },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'center',
      borderRadius: 15,
      padding: 15,
      marginTop: 10,
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#7FC8DE'
    },
    scrollContent: { flexDirection: 'column', justifyContent: 'space-between' },
    header: {
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Muli',
      fontSize: width * 0.04,
      color: '#000',
    },
    continue: {
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      margin: 20,
      backgroundColor: '#ff8c00',
      borderRadius: 10,
      height: width * 0.075,
      width: width * 0.4,
      elevation: 5,
    },
    continueTxt: {
      textAlign: 'center',
      fontFamily: 'Muli',
      fontSize: width * 0.045,
      color: '#000',
    },
    icon: { marginLeft: 10 },
    gtext: { fontFamily: 'Bookish' }
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Modal
      transparent
      style={styles.modal}
    >
      <SafeAreaView style={styles.externalBg}>
        <View style={styles.container}>
          <IonIcons name="close" size={width * 0.07} color="#000" style={styles.icon} onPress={() => { dispatch(close2048HelpModal()); }} />
          <ScrollView
            style={styles.scrollview}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.header}>
              Welcome to
              {' '}
              <Text style={styles.gtext}>2048</Text>
              {' '}
              game.
              {'\n\n'}
              Swipe to move all tiles.
              {'\n'}
            </Text>
            <HelpImg1 height={width * 0.7} style={styles.img} />

            <Text style={styles.header}>
              {'\n\n'}
              Two tiles with the same number merge when they touch!
              {'\n'}
            </Text>
            <HelpImg2 height={width * 0.7} style={styles.img} />

            <Text style={styles.header}>
              {'\n\n'}
              Reach the
              {' '}
              <Text style={styles.gtext}>2048</Text>
              {' '}
              tile to win the game!
              {'\n'}
            </Text>
            <HelpImg3 height={width * 0.7} style={styles.img} />
            <TouchableOpacity
              style={styles.continue}
              onPress={() => { dispatch(close2048HelpModal()); }}
            >
              <Text style={styles.continueTxt}>
                PLAY
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

export default Help;
