import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/landingPage';
import GameScreen from './components/theGame';
import { getWords } from './utils/database';

const Stack = createStackNavigator();

function App() {
  // example of how you would call it.
  var words1 = [];
  React.useEffect(() => {
    const words = async () => {
      words1 = await getWords();
      console.log(words1._array.length);
     //console.log(await getWords());
    };
   words();
   //console.log(promises);
  }, []);
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
