/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import IonIcons from 'react-native-vector-icons/Ionicons';
import WordWheel from '../../assets/wordWheel.svg';
import Tools from '../../assets/toolTips.svg';

import Dimensions from '../../util/dimensions';
import { closeHelpModal } from '../../redux/actions';

const { width } = Dimensions.get('window');

function Help() {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    Muli: require('../../assets/fonts/Muli.ttf'),
  });

  const styles = StyleSheet.create({
    modal: { flex: 1 },
    container: {
      alignSelf: 'center',
      alignContent: 'center',
      justifyContent: 'space-around',
      backgroundColor: '#0003',
      width: '100%',
      flex: 1
    },
    img: {
      alignSelf: 'center',
    },
    header: {
      justifyContent: 'center',
      fontFamily: 'Muli',
      fontSize: 20,
      color: '#fff',
      textAlign: 'justify'
    },
    continue: {
      justifyContent: 'center',
      textAlign: 'center',
      alignSelf: 'center',
      margin: 20,
      backgroundColor: '#ff8c00',
      borderRadius: 10,
      height: 50,
      width: width * 0.45,
      elevation: 5,
    },
    continueTxt: {
      textAlign: 'center',
      fontFamily: 'Muli',
      fontSize: 20,
      color: '#FFFFFF',
    },
    scrollview: {
      flex: 1,
      flexDirection: 'column',
      alignSelf: 'center',
      borderRadius: 15,
      padding: 15,
      marginVertical: 40,
      width: '90%',
      overflow: 'hidden',
      backgroundColor: '#274C7C',
    },
    scrollContent: { flexDirection: 'column', justifyContent: 'space-between' },
    left: { marginLeft: 10 }
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Modal
      transparent
      style={styles.modal}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollview}
          contentContainerStyle={styles.scrollContent}
        >
          <IonIcons name="close" size={30} color="#fff" style={styles.left} onPress={() => { dispatch(closeHelpModal()); }} />
          <Text style={styles.header}>
            Welcome to Akhar Jor game.
            {'\n'}
          </Text>
          <Text style={styles.header}>
            The game where you link up letters in Gurmukhi to spell a word associated with a
            Sikh-related,Gurbani, or Punjabi context. Here are some of the things you need to know.
          </Text>
          {/* <HelpImg1 height={400}  style={styles.img}/> */}

          <Text style={styles.header}>
            {'\n'}
            ◎ The game is split into many levels - in each level you will need to spell
            at least ten words using the Gurmukhi wheel of letters. The words get harder
            at each level but you are provided with a clue to help you solve the word.
            {'\n'}
          </Text>
          <WordWheel height={350} style={styles.img} />
          <Text style={styles.header}>
            {'\n'}
            Simply click the letters in the wheel to spell the word. If you get it wrong,
            you must try again. You can try as many times as you want without getting penalized.
            And if you get it right, you will be awarded points and the word will be added
            to your list of words.
            {'\n\n'}
            ◎ If you get stuck and need help, click on the bulb icon in the bottom left for a clue.
            The helper will fill in one letter for you - but beware, this will cost you credits
            you have accumulated that you can see by looking at the counter in the top-right corner.
            {'\n'}
          </Text>
          <Tools height={300} style={styles.img} />
          <Text style={styles.header}>
            {'\n'}
            The counter tells you how many credits you have left but clicking on the + icon
            next to it will give you the opportunity to earn some extra ones.
            You will just need to spell out a sentence to be gifted credits.
          </Text>

          <TouchableOpacity
            style={styles.continue}
            onPress={() => { dispatch(closeHelpModal()); }}
          >
            <Text style={styles.continueTxt}>
              PLAY
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default Help;
