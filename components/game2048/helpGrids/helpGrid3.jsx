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
    Modal
} from 'react-native';
import { useFonts } from 'expo-font';
import * as Animatable from 'react-native-animatable';
import {useSelector, useDispatch } from 'react-redux';
import AppLoading from 'expo-app-loading';
import HelpImg from '../../../assets/helpGrid3.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Dimensions from '../utils/dimensions';
import { openHelpModal } from '../../../redux/actions';
const { height, width } = Dimensions.get('window');

function HelpGrid3() {
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
            height: height*.8,
            width: width*.95,
        },
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: 25,
        },
        continue:{
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#274C7C',
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
            visible={state.helpPage[0] === 2}
            animationType="none"
        transparent
        onRequestClose={() => dispatch(openHelpModal())}
      >
        <Animatable.View 
            animation="fadeInRight"
            iterationCount={1}
            iterationDelay={50}
            style={styles.container}>
            <View style={styles.page}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>
                    <IonIcons name="close" size={30} color="#000" style={{marginLeft: 10}} onPress={() => {dispatch(openHelpModal())}} />
                </View>
                <Text style={styles.header}>
                Reach the 2048 tile to win the game!
                </Text>
                <HelpImg height={300}/>
                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(openHelpModal())}}>
                    <Text style={styles.continueTxt}>
                        PLAY
                    </Text>
                </TouchableOpacity>
                <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: width*.9}}>
                    <Text style={{...styles.header, fontSize: 20 }}>3/3</Text>
                </View>
            </View>
        </Animatable.View>
        </Modal>
    );
}

export default HelpGrid3;