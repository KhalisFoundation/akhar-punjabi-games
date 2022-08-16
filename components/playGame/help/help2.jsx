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

function Help2() {
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
            visible={state.helpPage[0] === 4}
            animationType="none"
        transparent
        onRequestClose={() => dispatch(openHelpModal())}
      >
      <View 
          style={styles.container}>
          <Animatable.View
              animation="slideInRight"
              iterationCount={1}
              iterationDelay={100}
              style={styles.page}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row', width: width*.9}}>
                    <IonIcons name="close" size={30} color="#000" style={{marginLeft: 10}} onPress={() => {dispatch(openHelpModal())}} />
                </View>
                <Text style={styles.header}>
                    Two tiles with the same number merge when they touch!
                </Text>
                <HelpImg height={300}/>
                <TouchableOpacity
                    style={styles.continue}
                    onPress={() => {dispatch(openHelpModal(5))}}>
                    <Text style={styles.continueTxt}>
                        CONTINUE
                    </Text>
                </TouchableOpacity>
                <View style={{justifyContent: 'flex-end', flexDirection: 'row', width: width*.9}}>
                    <Text style={{...styles.header, fontSize: 20 }}>2/3</Text>
                </View>
            </Animatable.View>
        </View>
        </Modal>
    );
}

export default Help2;