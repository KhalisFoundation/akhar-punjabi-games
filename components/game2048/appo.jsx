import * as React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Container from './components/Container';

export default function New2048({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Container startTiles={2} size={4} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
