import * as React from 'react';
import {
    StyleSheet,
    SafeAreaView,
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
import {useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HelpImg from '../../../assets/helpGrid1.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Dimensions from '../../../util/dimensions';
import { openHelpModal } from '../../../redux/actions';
const { height, width } = Dimensions.get('window');

function HelpGrid1() {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);

    const [fontLoaded] = useFonts({
        Muli: require('../../../assets/fonts/Muli.ttf'),
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            alignItems: 'center',
            backgroundColor: '#0003',
            width: '100%',
            height: '100%',
        },
        page: {
            backgroundColor: '#7FC8DE',
            padding: 10,
            borderRadius: 25,
            justifyContent: 'space-evenly',
            alignSelf: 'center',
            alignItems: 'center',
            width: '90%',
            minHeight: '80%',
        },
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: Dimensions.size['8'],
        },
        continue:{
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#274C7C',
            borderRadius: 10,
            height: Dimensions.size['16'],
            width: width*.4,
            elevation: 5,
        },
        continueTxt: {
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: Dimensions.size['6'],
            color: '#FFFFFF',
        },
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

    return (
    <Modal
        transparent
        style={{ flex: 1, marginTop: (Platform.OS == 'android') ? '3.5%' : 0, ...styles.container}}
      >
        <View 
            style={styles.container}>
            <View style={styles.page}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>
                    <IonIcons name="close" size={30} color="#000" style={{marginLeft: 10}} onPress={() => {dispatch(openHelpModal())}} />
                </View>
                <Text style={styles.header}>
                    Welcome to 2048 game.
                    {'\n\n'}
                    Swipe to move all tiles.
                </Text>
                <HelpImg height={2*Dimensions.size['60']}/>
                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(openHelpModal(1))}}>
                    <Text style={styles.continueTxt}>
                        CONTINUE
                    </Text>
                </TouchableOpacity>
                <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: '100%'}}>
                    <Text style={{...styles.header, fontSize: Dimensions.size['6'] }}>1/3</Text>
                </View>
            </View>
        </View>
        </Modal>
    );
}

export default HelpGrid1;