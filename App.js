import React, { useState } from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { LogBox } from "react-native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Navigator from "./navigator/Navigator";
import rootReducer from "./store/reducers";
import { initDB } from "./helpers/db";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(["Warning: ..."]);

const fetchFonts = async () => {
  await Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};

initDB()
  .then(() => {
    console.log("DataBase Initialized.");
  })
  .catch((err) => {
    console.log(`DataBase Initialization failed;  Error message --> ${err}`);
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
