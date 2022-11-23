/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';
import EnIcon from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import dimensions from '../../util/dimensions';

const { height, width } = dimensions;
export const StatsBox = ({ stat, navigation }) => {
  const state = useSelector((theState) => theState.theGameReducer);

  const items = {
    levels: {
      name: 'Level',
      icon: 'shield',
      color: '#93FFD8',
      value: state.levelProgress[0].level
    },
    hints: {
      name: 'Hints',
      icon: 'lightbulb-on',
      color: '#FF7E00',
      value: state.giveUpsLeft
    }
  };

  const item = items[stat];
  return (
    <View
      style={styles.upBox}
    >
      {stat === 'levels'
        ? (
          <EnIcon
            name={item.icon}
            size={width * 0.05}
            color={item.color}
          />
        ) : (
          <IconM
            name={item.icon}
            size={width * 0.05}
            color={item.color}
          />
        )}
      <Text style={styles.upText}>
        {(item.name === 'Level') ? `${item.name} ${item.value}` : `${item.value}`}
      </Text>
      {(item.name === 'Hints')
        ? (
          <TouchableOpacity
            onPress={() => { navigation.navigate('giveUps', { prevScreen: 1 }); }}
          >
            <IconM name="plus-circle" size={width * 0.05} color="#06FF00" />
          </TouchableOpacity>
        ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  upBox: {
    backgroundColor: '#072227',
    flexDirection: 'row',
    height: height * 0.045,
    width: width * 0.3,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: width * 0.02,
    justifyContent: 'space-evenly'
  },
  upText: {
    color: 'white',
    fontSize: width * 0.035,
    fontWeight: 'bold'
  }
});
