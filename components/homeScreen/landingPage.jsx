/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import IonIcons from 'react-native-vector-icons/Ionicons';
import EnIcon from 'react-native-vector-icons/Entypo';
import MaskedView from '@react-native-community/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { setTheState } from '../../redux/actions';
import Help from '../playGame/help';
import Khalis from '../../assets/khalis_logo.svg';
import { initialState } from '../../redux/reducers';
import { openHelpModal } from '../../redux/actions';
import dimensions from '../../util/dimensions';

function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  // const state = useSelector((theState) => theState.theGameReducer);
  const [fontsLoaded] = useFonts({
    Arial: require('../../assets/fonts/Arial.ttf'),
    GurbaniHeavy: require('../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../assets/fonts/Bookish.ttf'),
    Prabhki: require('../../assets/fonts/Prabhki.ttf'),
    Mochy: require('../../assets/fonts/Mochy.ttf'),
    Muli: require('../../assets/fonts/Muli.ttf'),
    Nasa: require('../../assets/fonts/Nasalization.otf'),
  });
  const state = useSelector((theState) => theState.theGameReducer);
  const width = dimensions.width;
  //const [loadingScreenStatus, setLoadingScreen] = React.useState(true);
  let theState;
  React.useEffect(() => {
    async function getData() {
      try {
        const theStringState = await AsyncStorage.getItem('state');
        if (theStringState !== null) {
          theState = JSON.parse(theStringState);
          console.log('got state that was previously saved');
          // console.log(theState);
        } else {
          console.log('there is nothing is state');
          theState = initialState;
        }
        dispatch(setTheState(theState));
        //setLoadingScreen(false);
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    getData();
  }, [dispatch]);
  // console.log(theColors[state.darkMode]);
  // console.log(state.darkMode);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: "#162b5e",
      padding: 10,
      paddingHorizontal: 20,
    },
    logo: {
      height: '30%', alignSelf: 'center'
    },
    playTouchableOpacity: {
      width: '50%',
      alignSelf: 'center',
      alignItems: 'center',
      borderRadius: 15,
      marginBottom: 15,
      elevation: 5,
      backgroundColor: "#FF7E00",
    },
    play: {
      fontSize: width*.07,
      fontFamily: 'Nasa',
      color: '#fff',
      textAlign: 'center',marginVertical: 10,
      // textShadowOffset: {width: 2, height: 2},
      // textShadowRadius: 10,
      // textShadowColor: 'darkblue',
    },
    otherScreens: {
      flexDirection: 'row',
      // backgroundColor: "yellow",
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    otherScreenTouchableOpacity: {
      flex: 1,
      margin: 10,
    },
    khalisTouchableOpacity: {
      height: '8%',
      width: '45%',
    },
    khalis: {
      height: '100%',
      width: '100%',
      borderRadius: 5,
      alignItems: 'center',
    },
    back: {
      backgroundColor: '#035',
      padding: 10,
      borderRadius: 50,
      alignSelf: 'flex-start',
      marginTop: 10,
      marginLeft: 10,
    },
    bold: {
      fontWeight: 'bold',
      alignSelf: 'center',
    },
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content" />
        
        { state.helpPage ? <Help /> : null }
      {/* <LoadingModal visible={loadingScreenStatus} /> */}
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%', paddingHorizontal:5, marginTop:5}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{padding:5}}
      >

        <IonIcons name="chevron-back" size={width*.07} color={'#fff'}/>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('settings');
          }}
          style={{padding:5}}
        >
          <Icon name="cog" size={width*.07} color="#ccc" style={styles.bold} />
      </TouchableOpacity>
      </View>
      <View
              style={{
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
        <Text style={{fontFamily: 'Bookish', fontSize: width*.14,
      color: '#cdff',}}>
          AKr joV
        </Text>
        <Text style={{fontFamily: 'Nasa', fontSize: width*.09,color: '#cdff'}}>
          Akhar Jor
        </Text> 
        </View>
        <View style={{width:"100%"}}>
          {/*PLay transition*/}
      <TouchableOpacity
        style={styles.playTouchableOpacity}
        onPress={() => {
          navigation.navigate('play');
        }}
      >
        <Text style={styles.play}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {dispatch(openHelpModal()); console.log(state.helpPage)}}
      >
        <Text style={{...styles.play, fontFamily:'Muli', fontSize: width*.05, textDecorationStyle:'solid', textDecorationColor: "#fff", textDecorationLine:"underline"}}>How do I play?</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.otherScreens}>
        

        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('correctWords'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >
          <EnIcon name="shield" size={width*.15} color="yellow" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Muli', fontWeight: 'normal', color: 'white', textAlign:'center' }}>Levels</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.otherScreenTouchableOpacity}
          onPress={() => {
            navigation.navigate('giveUps'); // how to pass params to other screen. We probaly won't need but there just for refrence
          }}
        >

          <Icon name="heart" size={width*.15} color="#f55aff" style={styles.bold} />
          <Text style={{ ...styles.bold, fontFamily: 'Muli', fontWeight: 'normal', color: 'white' }}>Get Lives</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.khalisTouchableOpacity}
        onPress={() => Linking.openURL('https://khalisfoundation.org')}
      >
        <Khalis/>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default HomeScreen;
