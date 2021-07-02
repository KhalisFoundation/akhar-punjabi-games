/* eslint-disable react-native/no-color-literals */
import * as React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // borderRadius: 20,
  },
});

export default Loading;
