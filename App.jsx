import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/landingPage";
import NextScreen from "./components/next";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Next"
          options={{ headerShown: false }}
          component={NextScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
