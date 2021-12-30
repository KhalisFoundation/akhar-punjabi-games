import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import HomeScreen from './components/homeScreen/landingPage';
import GameScreen from './components/playGame/theGame';
import RightWords from './components/wordsDone/wordsCompleted';
import Settings from './components/settings/settings';
import MoreGiveUps from './components/getMoreGiveUps/getMoreGiveUps';
import About from './components/about/about';

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
          />
          <Stack.Screen
            name="settings"
            options={{ headerShown: false }}
            component={Settings}
          />
          <Stack.Screen
            name="giveUps"
            options={{ headerShown: false }}
            component={MoreGiveUps}
          />
          <Stack.Screen
            name="about"
            options={{ headerShown: false }}
            component={About}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
