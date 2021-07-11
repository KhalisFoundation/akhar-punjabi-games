/* eslint-disable react-native/no-color-literals */
import * as React from "react";
import { View, StyleSheet, ActivityIndicator, Modal, Text } from "react-native";

import colors from "../../util/colors";
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
    width: "100%",
    height: "10%",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.loadingScreen.container,
  },
  msg: {
    fontSize: 25,
    textAlign: "center",
  },
});

export default LoadingModal;
