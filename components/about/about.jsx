import * as React from 'react';;
import {
  StyleSheet,
  Image,
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';
import { Header } from 'react-native-elements';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import GLOBAL from '../../util/globals';
import Khalis from '../../assets/khalis_logo.svg';
import KhalisDark from '../../assets/khalis_logo_dark.svg';
import Logo from '../../assets/sikh_games.svg';
import dimensions, { width } from '../../util/dimensions';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';

function About({ navigation }) {
  const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Muli: require('../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  const styles = StyleSheet.create({
    container: { flex: 1},
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      padding: 15,
      height: '100%'
    },
    singleLine: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    title: {
      fontSize: 40,
    },
    small: {
      fontSize: 11
    }
  });
  const linkColor = '#009bff';
  const black = '#000';
  const white = '#fff';
  const lightGradient = ['#FF0076', '#590FB7'];
  const darkGradient = ['#ff8008', '#ffc837'];
  const transparent = 'transparent';

  if (!fontsLoaded) {
    return <AppLoading/>
  }
  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        backgroundColor="#003436"
        barStyle="light-content"
      />
      <View style={{width: '100%', height: dimensions.size['24'], backgroundColor:GLOBAL.COLOR.TOOLBAR_COLOR_ALT2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', elevation:5}}>
        <IonIcons
            name="chevron-back"
            color={GLOBAL.COLOR.TOOLBAR_TINT}
            size={30}
            style={{position: 'absolute', left: 10}}
            onPress={() => { navigation.goBack(); }}
          />
          <Text style={{
            color: GLOBAL.COLOR.TOOLBAR_TINT,
            fontSize: (dimensions.screenWidth<370 ? 16 : 20),
            fontFamily: 'Muli',
            margin:0,
          }}>About</Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        style={styles.scrollview}
        contentContainerStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}
      >
        {/* <View>
          <MaskedView
            style={{ height: 50, width: '100%' }}
            maskElement={(
              <View
                style={{
                  backgroundColor: transparent,
                }}
              >
                <Text style={[styles.title, { fontFamily: 'Bookish' }]}>is~K gyms</Text>
              </View>
            )}
          >
            <LinearGradient
              colors={state.darkMode ? darkGradient : lightGradient}
              style={{ flex: 1 }}
            />
          </MaskedView>
          <Text style={{ fontFamily: 'Nasa', fontSize:25, color: "#61CAE5"}}>(SIKH GAMES)</Text>
        </View> */}
        <Logo style={{height: 175, marginTop: 20}}/>

        {/* Explaining Akhar Jor*/}
        <Text style={{ fontFamily: 'Nasa', fontSize: 25, color: black }}>{'\n'}Akhar Jor</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Muli', color: black, margin:10, marginTop: 0 }}>
          {''}
          utilizes a collection of commonly used Punjabi/Gurmukhi words to create an interactive game that is fun and easy to learn,
          for spreading the knowledge of our Mother Tongue, Punjabi.
          {' '}
      </Text>

      {/* Explaining 2048 */}
      <Text style={{ fontFamily: 'GurbaniHeavy', fontSize: 30, color: black}}>{'\n'}2048</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Muli', color: black, margin:10, marginTop: 0 }}>
          {''}utilizes the concept of a popular number game 2048 combined with Punjabi numerals to make learning easy.
        </Text>

      {/* Welcoming comments and suggestions */}
      <Text style={{ fontSize: 16, fontFamily: 'Muli', color: black }}>
      <Text>{'\n'}</Text>
      <Text>
        We welcome your comments, suggestions, and corrections!
        {' '}
        For information, suggestions, or help, visit us at
        {'  '}
      </Text>
      <Text
        style={{ color: linkColor, fontWeight: 'bold' }}
        onPress={() => Linking.openURL('https://khalisfoundation.org')}
      >
        KhalisFoundation.org
      </Text>
      {'\n'}
      </Text>
        <View>
          <Text style={{ fontFamily: 'Muli', alignSelf: 'flex-end', color: black }}>
            {'\n'}
            Bhul Chuk Maaf!
            {'\n'}
          </Text>

          <TouchableOpacity
            underlayColor={linkColor}
            onPress={() => Linking.openURL('https://khalisfoundation.org')}
          >
            {<KhalisDark height={50} />}
          </TouchableOpacity>

          <View style={styles.singleLine}>
            <Text
                style={[styles.small, { fontFamily: 'Muli', color: black }]}
              >
                &copy;
                {' '}
                {new Date().getFullYear()}
                {' '}
                Khalis Foundation
              </Text>
            <Text
              style={[styles.small, { fontFamily: 'Muli', color: black }]}
            >
              Chardikala
              {'\n'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default About;
