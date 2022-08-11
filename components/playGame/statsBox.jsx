import * as React from 'react';
import {
    View, TextView, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

export const StatsBox = ({stat, navigation}) => {
    const state = useSelector((theState) => theState.theGameReducer);
    const dispatch = useDispatch();

    const items = {
        levels: {
            name: "Level",
            icon: "trophy-award",
            color: "#93FFD8",
            value: state.levelProgress[0].level
        },
        points: {
            name: "Points",
            icon: "star-four-points",
            color: "yellow",
            value: state.totalPoints
        },
        hints: {
            name: "Hints",
            icon: "lightbulb-on",
            color: "#FF7E00",
            value: state.giveUpsLeft
        }
    }

    const item = items[stat];
    return (<View
        style={styles.upBox}
      >
        <IconM
          name={item.icon}
          size={25}
          color={item.color}
        />
        <Text style={styles.upText}>
            {(item.name === "Level") ? `${item.name} ${item.value}` : `${item.value}`}
        </Text>
        {(item.name === "Hints") ? 
            <TouchableOpacity
                onPress={() => { navigation.navigate('giveUps', { prevScreen: 1 }); }}
            >
                <IconM name="plus-circle" size={25} color="#06FF00" />
            </TouchableOpacity> : null}
      </View>)
}

const styles = StyleSheet.create({
    upBox: {
      backgroundColor: '#072227',
      flexDirection: 'row',
      height: "70%",
      width: "25%",
      alignItems: 'center',
      borderRadius: 30,
      elevation: 5,
      justifyContent: 'space-evenly'
    },
    upText: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    }
});