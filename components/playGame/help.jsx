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
import HelpImg1 from '../../assets/helpPage1.svg';
import HelpImg2 from '../../assets/helpPage2.svg';
import HelpImg3 from '../../assets/helpPage3.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';

import Dimensions from '../../util/dimensions';
import { closeHelpModal } from '../../redux/actions';
const { height, width } = Dimensions.get('window');

function Help() {
    const dispatch = useDispatch();
    const state = useSelector((theState) => theState.theGameReducer);

    const [fontLoaded] = useFonts({
        Muli: require('../../assets/fonts/Muli.ttf'),
    });

    const styles = StyleSheet.create({
        container: {
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#0003',
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
        img: {
            alignSelf: 'center',
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
            flexDirection: 'column',
            alignSelf: 'center',
            borderRadius: 25,
            padding: 15,
            minHeight: '80%',
            width: '90%',
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

    if (!fontLoaded) {
      return <AppLoading />;
    }

    return (
    <Modal
        transparent
        style={ { flex: 1, 
            marginTop: (Platform.OS == 'android') ? '3.5%' : 0, }}
    >
        <View style={styles.container}>
            <ScrollView 
                style={styles.scrollview}
                contentContainerStyle={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                <IonIcons name="close" size={30} color="#fff" style={{marginLeft: 10}} onPress={() => {dispatch(closeHelpModal())}} />
                <Text style={styles.header}>
                    Welcome to Akhar Jor game.
                    {'\n\n'}
                    Click or Swipe to join Gurmukhi letters to create words from meaning.
                </Text>
                <HelpImg1 height={2*Dimensions.size['80']}  style={styles.img}/>

                <Text style={styles.header}>
                    {'\n\n'}
                    Some basics to get you started!
                </Text>
                <HelpImg2 height={2*Dimensions.size['60']}  style={styles.img}/>
                
                <Text style={styles.header}>
                    {'\n\n'}
                    The more you try, the more you learn Punjabi!
                </Text>
                <HelpImg3 height={2*Dimensions.size['80']}  style={styles.img}/>

                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(closeHelpModal())}}>
                    <Text style={styles.continueTxt}>
                        PLAY
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </Modal>
    );
}

export default Help;