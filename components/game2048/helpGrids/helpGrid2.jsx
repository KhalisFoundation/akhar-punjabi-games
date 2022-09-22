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
    Platform,
    Modal
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HelpImg from '../../../assets/helpGrid2.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Dimensions from '../../../util/dimensions';
import { openHelpModal } from '../../../redux/actions';
const { height, width } = Dimensions.get('window');

function HelpGrid2() {
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
            visible={state.helpPage[0] === 1}
            animationType="slide"
            transparent
            onRequestClose={() => dispatch(openHelpModal())}
        >
        <View style={styles.container}>
            <View style={styles.page}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>
                    <IonIcons name="close" size={30} color="#000" style={{marginLeft: 10}} onPress={() => {dispatch(openHelpModal())}} />
                </View>
                <Text style={styles.header}>
                    Two tiles with the same number merge when they touch!
                </Text>
                <HelpImg height={2*Dimensions.size['60']}/>
                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(openHelpModal(2))}}>
                    <Text style={styles.continueTxt}>
                        CONTINUE
                    </Text>
                </TouchableOpacity>
                <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: '100%'}}>
                    <Text style={{...styles.header, fontSize: Dimensions.size['6'] }}>2/3</Text>
                </View>
            </View>
        </View>
        </Modal>
    );
}

export default HelpGrid2;