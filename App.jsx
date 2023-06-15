import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Analytics from 'expo-firebase-analytics';
import { useEffect } from 'react';
import MenuScreen from './components/menuScreen/menuPage';
import HomeScreen from './components/homeScreen/landingPage';
import GameScreen from './components/playGame/theGame';
import RightWords from './components/wordsDone/wordsCompleted';
import Settings from './components/settings/settings';
import MoreGiveUps from './components/getMoreGiveUps/getMoreGiveUps';
import About from './components/about/about';
import New2048 from './components/game2048/app';
import Wordle from './components/wordle/wordle';
import { Store } from './redux/store';
import { auth } from './firebase';

const Stack = createStackNavigator();

function App() {

  auth.signInAnonymously()
    .then(() => {
    // Signed in..
      console.log('New user logged in!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Error code: ', errorCode, '\n Error: ', errorMessage);
    });

  auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const { uid } = user;
      const displayName = user.displayName ? user.displayName : 'Alien';
      console.log('User ID: ', uid, '\n User Name: ', displayName);
    } else {
      // User is signed out
      console.log('User is signed out');
    }
  });

  // Log to firebase which OS the user is using
  async function logOS() {
    console.log('Device OS: ', Platform.OS);
    await Analytics.logEvent('device_os', { name: Platform.OS });
  }

  useEffect(() => {
    logOS();
  });
  // Get the current screen from the navigation state
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = React.useRef();

  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.getCurrentRoute().name;
            if (previousRouteName !== currentRouteName) {
            // The line below uses the expo-firebase-analytics tracker
            // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
            // Change this line to use another Mobile analytics SDK
              await Analytics.setCurrentScreen(currentRouteName);
            }

            // Save the current route name for later comparison
            routeNameRef.current = currentRouteName;
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              ...TransitionPresets.FadeFromBottomAndroid
            }}
          >
            <Stack.Screen
              name="Menu"
              component={MenuScreen}
            />
            <Stack.Screen
              name="AkharJor"
              component={HomeScreen}
            />
            <Stack.Screen
              name="2048"
              component={New2048}
            />
            <Stack.Screen
              name="play"
              options={{ headerShown: false, }}
              component={GameScreen}
            />
            <Stack.Screen
              name="wordle"
              options={{ headerShown: false, }}
              component={Wordle}
            />
            <Stack.Screen
              name="correctWords"
              component={RightWords}
            />
            <Stack.Screen
              name="settings"
              component={Settings}
            />
            <Stack.Screen
              name="giveUps"
              component={MoreGiveUps}
              initialParams={{ prevScreen: 0 }}
            />
            <Stack.Screen
              name="about"
              component={About}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
