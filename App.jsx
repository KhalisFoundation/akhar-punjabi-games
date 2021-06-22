import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/landingPage";
import GameScreen from "./components/theGame";
import getWords from "./util/generateWords";

const [characters, firstWord, secondWord] = getWords();
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
          component={GameScreen}
          initialParams={{
            charArray: characters,
            firstWord: firstWord,
            secondWord: secondWord,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
