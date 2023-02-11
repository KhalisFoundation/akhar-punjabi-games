import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Linking,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image
} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppLoading from 'expo-app-loading';
import GLOBAL from '../../util/globals';
import KhalisLogo from '../../assets/khalis_incubator.svg';
import Logo from "../../assets/akhar_logo_with_text.svg";
import dimensions from '../../util/dimensions';

function About({ navigation }) {
  const [fontsLoaded] = useFonts({
    Muli: require('../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  
  const {width} = dimensions;
  const linkColor = '#009bff';
  const black = '#000';
  const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
      color: GLOBAL.COLOR.TOOLBAR_TINT,
      fontSize: width * 0.05,
      fontFamily: 'Muli',
      margin: 0,
    },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      padding: 15,
      height: '100%'
    },
    scrollContent: { flexDirection: 'column', justifyContent: 'space-between' },
    singleLine: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    small: {
      fontSize: width * 0.03,
      fontFamily: 'Muli',
      color: black
    },
    innerView: {
      width: '100%',
      height: width*0.175,
      backgroundColor: GLOBAL.COLOR.TOOLBAR_COLOR_ALT2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5
    },
    back: {
      position: 'absolute',
      left: 10
    },
    info: {
      fontSize: width * 0.04, fontFamily: 'Muli', color: black, margin: 10, marginTop: 0, marginStart: 0
    },
    logo: {
      resizeMode: 'contain',
      alignSelf: 'center',
    },
    title1: { fontFamily: 'Nasa', fontSize: width * 0.06, color: black },
    title2: { fontFamily: 'GurbaniHeavy', fontSize: width* 0.07, color: black },
    aboutus: { fontSize: width * 0.04, fontFamily: 'Muli', color: black },
    link: { color: linkColor, fontWeight: 'bold' },
    ending: { fontSize: width*0.03, fontFamily: 'Muli', alignSelf: 'flex-end', color: black }
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar
        backgroundColor="#003436"
        barStyle="light-content"
      />
      <View style={styles.innerView}>
        <IonIcons
          name="chevron-back"
          color={GLOBAL.COLOR.TOOLBAR_TINT}
          size={width * 0.07}
          style={styles.back}
          onPress={() => { navigation.goBack(); }}
        />
        <Text style={styles.header}>About</Text>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        style={styles.scrollview}
        contentContainerStyle={styles.scrollContent}
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
        <Logo style={styles.logo} width={width*0.7} height={width*0.7} />

        <Text style={styles.aboutus}>
          {'\n'}
          Akhar: Punjabi Games is a treasure of fun games created by young developers at 
          Khalis Incubator, to help everyone learn punjabi the fun way.
        </Text>

        {/* Explaining Akhar Jor */}
        <Text style={styles.title1}>
          {'\n'}
          Akhar Jor
        </Text>
        <Text style={styles.info}>
          This game uses a collection of commonly used Gurmukhi/Punjabi words to create a
          game that is fun and easy to play. It will help you increase your vocabulary and
          understand more words that appear in Gurbani.
          {' '}
        </Text>

        {/* Explaining 2048 */}
        <Text style={styles.title2}>
          {'\n'}
          2048
        </Text>
        <Text style={styles.info}>
          A popular game combined with Punjabi numerals to help you learn and recognize numbers.
        </Text>

        {/* Welcoming comments and suggestions */}
        <Text style={styles.aboutus}>
          <Text>{'\n'}</Text>
          <Text>
            Khalis Incubator is an initiative by Khalis Foundation (a 501(c)3 non-profit organization registered and based in California, USA) to create more opportunities for youth from 
            traditionally under-represented groups with a focus on South Asian minority communities. We aim to 
            foster opportunities for growth whether that be in professional training, technical experience, or 
            Sikh cultural knowledge.
            {'\n\n'}
            We welcome your comments and corrections!
            {' '}
            For information, suggestions, or help, visit us at
            {'  '}
          </Text>
          <Text
            style={styles.link}
            onPress={() => Linking.openURL('https://khalis.dev')}
          >
            Khalis.dev
          </Text>
          {'\n'}
        </Text>
        <View>
          <Text style={styles.ending}>
            {'\n'}
            Bhul Chuk Maaf!
            {'\n'}
          </Text>

          <TouchableOpacity
            underlayColor={linkColor}
            onPress={() => Linking.openURL('https://khalis.dev')}
          >
            <KhalisLogo width={"100%"} height={100} />
          </TouchableOpacity>

          <View style={styles.singleLine}>
            <Text
              style={styles.small}
            >
              &copy;
              {' '}
              {new Date().getFullYear()}
              {' '}
              Khalis Incubator
            </Text>
            <Text
              style={styles.small}
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
