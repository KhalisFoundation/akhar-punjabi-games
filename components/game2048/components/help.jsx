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
import HelpImg1 from '../../../assets/helpGrid1.svg';
import HelpImg2 from '../../../assets/helpGrid2.svg';
import HelpImg3 from '../../../assets/helpGrid3.svg';
import {useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Dimensions from '../../../util/dimensions';
import { closeHelpModal } from '../../../redux/actions';
import { SafeAreaView } from 'react-native-safe-area-context';
const { height, width } = Dimensions.get('window');

function Help() {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);

    const [fontLoaded] = useFonts({
        Muli: require('../../../assets/fonts/Muli.ttf'),
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
        img: {
            alignSelf: 'center',
        },
        scrollview: {
            flex: 1,
            flexDirection: 'column',
            alignSelf: 'center',
            borderRadius: 15,
            padding: 15,
            marginVertical: 40,
            width: '90%',
            backgroundColor: '#7FC8DE',
            overflow: 'hidden',
          },
        page: {
            backgroundColor: '#274C7C',
            padding: 10,
            borderRadius: 25,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            alignItems: 'center',
            width: '80%',
            height: '90%',
        },
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: Dimensions.size['8'],
            color: '#000',
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
            color: '#000',
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

    if (!fontLoaded) {
      return <AppLoading />;
    }

    return (
    <Modal
        transparent
        style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
            <ScrollView 
                style={styles.scrollview}
                contentContainerStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <IonIcons name="close" size={30} color="#000" style={{marginLeft: 10}} onPress={() => {dispatch(closeHelpModal())}} />
                <Text style={styles.header}>
                    Welcome to 2048 game.
                    {'\n\n'}
                    Swipe to move all tiles.
                </Text>
                <HelpImg1 height={2*Dimensions.size['60']} style={styles.img}/>

                <Text style={styles.header}>
                    {'\n\n'}
                    Two tiles with the same number merge when they touch!
                </Text>
                <HelpImg2 height={2*Dimensions.size['60']} style={styles.img}/>
                
                <Text style={styles.header}>
                    {'\n\n'}
                    Reach the 2048 tile to win the game!
                </Text>
                <HelpImg3 height={2*Dimensions.size['60']} style={styles.img}/>
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