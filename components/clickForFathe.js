import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function Fathe() {
  const [count, setCount] = React.useState(0);

  function printFathe() {
    const lst = [];
    for (let i = 0; i < count; i++) {
      let num = i + 1;
      lst.push(
        <Text style={styles.text}>
          {num}.ਵਾਹਿਗੁਰੂਜੀਕਾਖਾਲਸਾਵਾਹਿਗੁਰੂਜੀਕੀਫਤੇ||
        </Text>
      );
    }
    return lst;
  }
  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Click for Fathe"
        onPress={() => {
          setCount((prev) => prev + 1);
        }}
      />
      {printFathe()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //justifyContent: "space-around",
  },
  text: {
    textAlign: "center",
    height: 20,
    width: 250,
    borderRadius: 50,
    backgroundColor: "blue",
    color: "#fff",
    //fontSize: 23,
  },
  button: {
    height: 70,
    backgroundColor: "darkslateblue",
    padding: 20,
  },
});
