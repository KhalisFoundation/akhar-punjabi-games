<<<<<<< HEAD
import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import HomeScreen from "./homeScreen/landingPage";

const mockStore = configureStore([]);

jest.useFakeTimers();
describe("HomeScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      myState: "sample text",
    });
  });

  it("has 7 children", () => {
    const tree = renderer.create(
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      )
      .toJSON();
    expect(tree.children.length).toBe(7);
  });
});
=======
import React from "react";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import HomeScreen from "./homeScreen/landingPage";

const mockStore = configureStore([]);

jest.useFakeTimers();
describe("HomeScreen", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      myState: "sample text",
    });
  });

  it("has 7 children", () => {
    const tree = renderer.create(
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      )
      .toJSON();
    expect(tree.children.length).toBe(7);
  });
});
>>>>>>> origin/dev
