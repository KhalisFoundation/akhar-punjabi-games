import React from 'react';
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
import { useFonts } from 'expo-font';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import AppLoading from 'expo-app-loading';
import GLOBAL from '../../util/globals';
import Khalis from '../../assets/khalis_logo.svg';
import KhalisDark from '../../assets/khalis_logo_dark.svg';
import Logo from '../../assets/sikh_games.svg';

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
    container: { flex: 1, 
      marginTop: (Platform.OS == 'android') ? '3.5%' : 0, },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      padding: 8,
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
    return <AppLoading />;
  }
  return (
    <View
      style={styles.container}
    >
      <StatusBar
        backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR_ALT2}
        barStyle="light-content"
      />
      <Header
        backgroundColor={GLOBAL.COLOR.TOOLBAR_COLOR_ALT2}
        containerStyle={[Platform.OS === 'android' && { height: 75, paddingTop: 0 }]}
        leftComponent={(
          <Icon
            name="arrow-back"
            color={GLOBAL.COLOR.TOOLBAR_TINT}
            size={30}
            onPress={() => { navigation.navigate('settings'); }}
          />
        )}
        centerComponent={{
          text: 'About',
          style: { color: GLOBAL.COLOR.TOOLBAR_TINT, fontSize: 18 }
        }}
      />
      <ScrollView
        scrollEventThrottle={16}
        style={[styles.scrollview, state.darkMode && { backgroundColor: black }]}
        contentContainerStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <View>
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
        </View>
        <Logo style={{height: 175, marginTop: 20}}/>

        {/* Explaining Akhar Jor*/}
        <Text style={{ fontFamily: 'Nasa', fontSize: 25, color: state.darkMode ? white : black }}>{'\n'}Akhar Jor</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Muli', color: state.darkMode ? white : black, margin:10, marginTop: 0 }}>
          {' '}
          utilizes
        <Text
          style={{ color: linkColor, }}
          onPress={() => Linking.openURL('https://www.discoversikhism.com/sikh.html')}
        >
          {' \n\n \u2022 '}
          DiscoverSikhism
        </Text>
        <Text
          style={{ color: linkColor }}
          onPress={() => Linking.openURL('https://1000mostcommonwords.com/1000-most-common-punjabi-words/')}
        >
          {', \n \u2022 '}
          1000MostCommonWords
        </Text>
        <Text
          style={{ color: linkColor }}
          onPress={() => Linking.openURL('https://www.chardikalaa.com/?page_id=61')}
        >
          {', \n \u2022 '}
          Chardikalaa
        </Text>
        <Text
          style={{ color: linkColor }}
          onPress={() => Linking.openURL('https://www.sikhiwiki.org/index.php/Gurmukhi_to_English')}
        >
          {', \n \u2022 '}
          SikhiWiki
        </Text>
        {' \n'}
          to create Punjabi Wordlink, an interactive game,
          {' '}
          for spreading the knowledge of our Mother Tongue, Punjabi.
          {' '}
      </Text>

      {/* Explaining 2048 */}
      <Text style={{ fontFamily: 'GurbaniHeavy', fontSize: 30, color: state.darkMode ? white : black}}>{'\n'}2048</Text>
        <Text style={{ fontSize: 16, fontFamily: 'Muli', color: state.darkMode ? white : black, margin:10, marginTop: 0 }}>
          {' '}utilizes the concept of a popular number game 2048 combined with Punjabi numerals to make learning easy and a game that is fun to play.
        </Text>

      {/* Welcoming comments and suggestions */}
      <Text style={{ fontSize: 16, fontFamily: 'Muli', color: state.darkMode ? white : black }}>
      <Text>{'\n '}</Text>
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
          <Text style={{ fontFamily: 'Muli', alignSelf: 'flex-end', color: state.darkMode ? white : black }}>
            {'\n'}
            Bhul Chuk Maaf!
            {'\n'}
          </Text>

          <TouchableOpacity
            underlayColor={linkColor}
            onPress={() => Linking.openURL('https://khalisfoundation.org')}
          >
            {state.darkMode ? <Khalis height={50} /> : <KhalisDark height={50} />}
          </TouchableOpacity>

          <View style={styles.singleLine}>
            <Text
                style={[styles.small, { fontFamily: 'Muli', color: state.darkMode ? white : black }]}
              >
                &copy;
                {' '}
                {new Date().getFullYear()}
                {' '}
                Khalis Foundation
              </Text>
            <Text
              style={[styles.small, { fontFamily: 'Muli', color: state.darkMode ? white : black }]}
            >
              Chardikala
              {'\n'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default About;
