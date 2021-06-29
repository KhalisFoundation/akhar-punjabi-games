import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/landingPage';
import GameScreen from './components/theGame';
import RightWords from './components/wordsCompleted';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
          initialParams={{ correctWords: [] }}
        />
        <Stack.Screen
          name="play"
          options={{ headerShown: false }}
          component={GameScreen}
        />
        <Stack.Screen
          name="correctWords"
          options={{ headerShown: false }}
          component={RightWords}
          initialParams={{ wordLst: [] }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
