import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import HomeScreen from './landingPage';

const mockStore = configureStore([]);

describe('HomeScreen', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      myState: 'sample text',
    });
  });

  it('has 8 children', () => {
    const tree = renderer.create(<Provider store={store}><HomeScreen /></Provider>).toJSON();
    expect(tree.children.length).toBe(8);
  });
});
