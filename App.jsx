import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './components/landingPage';
import GameScreen from './components/theGame';
import RightWords from './components/wordsCompleted';
import Settings from './components/settings';

import { Store } from './redux/store';

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
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
          <Stack.Screen
            name="settings"
            options={{ headerShown: false }}
            component={Settings}
            initialParams={{ wordLst: [] }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
