import React from 'react';
import { Provider } from 'react-redux';
import Game from './screens/game/index.tsx';
import { store } from './store';

export default function Wordle({ navigation }) {
  return (
    <Provider store={store}>
      <Game navigation={navigation} />
    </Provider>
  );
}
