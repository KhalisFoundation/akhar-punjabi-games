/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, StyleSheet, ActivityIndicator, Modal, Text
} from 'react-native';

import { useSelector } from 'react-redux';

import theColors from '../../util/colors';

function LoadingModal({ visible, theText }) {
  const state = useSelector((theState) => theState.theGameReducer);

  let colors;
  if (state === undefined) {
    colors = theColors.false;
  } else {
    colors = theColors[state.darkMode];
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '10%',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: colors.loadingScreen.container,
    },
    msg: {
      fontSize: 25,
      textAlign: 'center',
    },
  });
  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
    >
      <View style={styles.container}>
        <Text style={styles.msg}>ਵਾਹਿਗੁਰੂਜੀਕਾਖਾਲਸਾਵਾਹਿਗੁਰੂਜੀਕੀਫਤੇ||</Text>
        <ActivityIndicator
          size="large"
          color="blue"
          disable="disabled"
          animating
        />
        <Text style={styles.msg}>{theText}</Text>
      </View>
    </Modal>
  );
}

export default LoadingModal;
