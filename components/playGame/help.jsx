import * as React from 'react';
import {
    StyleSheet,
    Image,
    View,
    Text,
    Linking,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Modal,
    Platform
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HelpImg1 from '../../assets/helpPage1.svg';
import HelpImg2 from '../../assets/helpPage2.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Dimensions from '../../util/dimensions';
import { closeHelpModal } from '../../redux/actions';
const { height, width } = Dimensions.get('window');

function Help() {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);

    const [fontsLoaded] = useFonts({
        Muli: require('../../assets/fonts/Muli.ttf'),
    });

    const styles = StyleSheet.create({
        container: {
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#0003',
            width: '100%',
            flex:1
        },
        page: {
            backgroundColor: '#274C7C',
            padding: 10,
            borderRadius: 25,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            alignItems: 'center',
            width: '98%',
            height: '90%',
        },
        img: {
            alignSelf: 'center',
        },
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: 20,
            color: '#fff',
        },
        continue:{
            justifyContent: 'center',
            textAlign: 'center',
            alignSelf: 'center',
            margin: 20,
            backgroundColor: '#ff8c00',
            borderRadius: 10,
            height: 50,
            width: width*.45,
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

    if (!fontsLoaded) {
      return <AppLoading />;
    }

    return (
    <Modal
        transparent
        style={{ flex: 1}}>
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollview}
                contentContainerStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <IonIcons name="close" size={30} color="#fff" style={{marginLeft: 10}} onPress={() => {dispatch(closeHelpModal())}} />
                <Text style={styles.header}>
                    Welcome to Akhar Jor game.
                    {'\n\n'}
                    Click to select Gurmukhi letters to create word from meaning.
                </Text>
                <HelpImg1 height={400}  style={styles.img}/>

                <Text style={styles.header}>
                    {'\n\n'}
                    Some basics to get you started!
                </Text>
                <HelpImg2 height={300}  style={styles.img}/>
                
                <Text style={styles.header}>
                    {'\n\n'}
                    The more you try, the more you learn Punjabi!
                </Text>

                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(closeHelpModal())}}>
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