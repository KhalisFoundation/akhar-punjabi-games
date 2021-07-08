/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import {
  View, StyleSheet, ActivityIndicator, Modal, Text
} from 'react-native';

function LoadingModal({ visible, theText }) {
  return (
    <Modal
      visible={visible}
      // visible={true}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '10%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#6e7f80',
  },
  msg: {
    fontSize: 25,
    textAlign: 'center',
  },
});

export default LoadingModal;
