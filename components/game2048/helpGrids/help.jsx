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
import HelpGrid1 from './helpGrid1';
import HelpGrid2 from './helpGrid2';
import HelpGrid3 from './helpGrid3';
import HelpImg from '../../../assets/helpPage1.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Dimensions from '../../../util/dimensions';
import { openHelpModal } from '../../../redux/actions';
const { height, width } = Dimensions.get('window');

function Help() {
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
            backgroundColor: '#0005',
            width: '100%',
            height: '100%',
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
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: Dimensions.size['8'],
            color: '#fff',
        },
        continue:{
            justifyContent: 'center',
            textAlign: 'center',
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

    if (!fontLoaded) {
      return <AppLoading />;
    }

    return (
    <Modal
        visible={state.helpPage !== []}
        animationType="none"
        transparent
        onRequestClose={() => dispatch(openHelpModal())}
      >
        <View style={styles.container}>
            { state.helpPage[0] === 0 ? <HelpGrid1 /> : null }
            { state.helpPage[0] === 1 ? <HelpGrid2 /> : null }
            { state.helpPage[0] === 2 ? <HelpGrid3 /> : null }
        </View>
    </Modal>
    );
}

export default Help;