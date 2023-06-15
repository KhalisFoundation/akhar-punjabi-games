import { useFonts } from 'expo-font';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';

import { useAppSelector } from '../../hooks/storeHooks';
import MainNavigator from '../../navigation/mainNavigator';

export default function MainScreen() {
  const { theme } = useAppSelector((state) => state.theme);
  const [fontsLoaded] = useFonts({
    Muli: require('../../../../assets/fonts/Muli.ttf'),
    GurbaniHeavy: require('../../../../assets/fonts/GurbaniAkharHeavySG.ttf'),
    Bookish: require('../../../../assets/fonts/Bookish.ttf'),
    Mochy: require('../../../../assets/fonts/Mochy.ttf'),
    Prabhki: require('../../../../assets/fonts/Prabhki.ttf'),
    Nasa: require('../../../../assets/fonts/Nasalization.otf'),
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer theme={theme.dark ? DarkTheme : DefaultTheme}>
      <MainNavigator />
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
    </NavigationContainer>
  );
}
