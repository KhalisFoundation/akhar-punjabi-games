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
    Platform
} from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import HelpImg from '../../../assets/helpGrid2.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Dimensions from '../utils/dimensions';
const { height, width } = Dimensions.get('window');

function HelpGrid2({navigation}) {
    
    const [fontLoaded] = useFonts({
        Muli: require('../../../assets/fonts/Muli.ttf'),
    });

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: '#7FC8DE',
            padding: 10,
        },
        header: {
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: 'Muli',
            fontSize: 25,
            marginBottom: 10,
        },
        continue:{
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#274C7C',
            borderRadius: 10, margin: 10,
            height: 50,
            width: 150,
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
        <View style={styles.container}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>
                <IonIcons name="close" size={30} color="#000" style={{marginLeft: 10}} onPress={() => {navigation.navigate('2048')}} />
                <Text style={{...styles.header, fontSize: 20 }}>2/3</Text>
            </View>
            <Text style={styles.header}>
                Two tiles with the same number merge when they touch!
            </Text>
            <HelpImg height={300}/>
            <TouchableOpacity
                style={styles.continue}
                onPress={() => {navigation.navigate('help3')}}>
                <Text style={styles.continueTxt}>
                    CONTINUE
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default HelpGrid2;