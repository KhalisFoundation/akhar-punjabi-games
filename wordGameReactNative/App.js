import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";

export default function App() {
  const [fatheList, setList] = React.useState([
    "ਵਾਹਿਗੁਰੂਜੀਕਾਖਾਲਸਾਵਾਹਿਗੁਰੂਜੀਕੀਫਤੇ||",
  ]);

  const [count, setCount] = React.useState(0);
  function printLst() {
    let lst = [];
    for (let i = 0; i < count; i++) {
      lst.push(<Text>ਵਾਹਿਗੁਰੂਜੀਕਾਖਾਲਸਾਵਾਹਿਗੁਰੂਜੀਕੀਫਤੇ||</Text>);
    }
    return lst;
  }
  return (
    <View style={styles.container}>
      {printLst()}
      <Button
        title="CLICK"
        onPress={() => {
          setCount((prev) => prev + 1);
        }}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
