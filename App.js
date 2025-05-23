import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_600SemiBold,
  Roboto_300Light,
} from '@expo-google-fonts/roboto';
import { Jersey10_400Regular } from '@expo-google-fonts/jersey-10';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Screens
import SplashScreen from './screens/SplashScreen';
import UserDetails from './screens/UserDetails';
import DebugScreen from './screens/DebugScreen';
import GameScreen from './screens/GameScreen';
import GameModeScreen from './screens/GameModeScreen';

// Define screen names as constants
const SCREENS = {
  SPLASH: 'splash',
  USER_DETAILS: 'userdetails',
  DEBUG: 'debugscreen',
  GAME: 'gamescreen',
  GAME_MODE: 'gamemodescreen',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [screenProps, setScreenProps] = useState({});
  const [history, setHistory] = useState([{ screen: SCREENS.SPLASH, props: {} }]);

  const [fontsLoaded] = useFonts({
    'Roboto-Light': Roboto_300Light,
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
    'Roboto-SemiBold': Roboto_600SemiBold,
    'Jersey10-Regular': Jersey10_400Regular,
  });

  // Navigation handler
  const navigate = (screenName, props = {}) => {
    setCurrentScreen(screenName);
    setScreenProps(props);
    setHistory((prevHistory) => [...prevHistory, { screen: screenName, props }]);
  };

  // Back navigation handler
  const goBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setCurrentScreen(previousScreen.screen);
      setScreenProps(previousScreen.props);
      setHistory(newHistory);
    }
  };

  // Font loading state handling
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  // Render the current screen based on state
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.SPLASH:
        return <SplashScreen navigate={navigate} goBack={goBack} {...screenProps} />;
      case SCREENS.USER_DETAILS:
        return <UserDetails navigate={navigate} goBack={goBack} {...screenProps} />;
      case SCREENS.DEBUG:
        return <DebugScreen navigate={navigate} goBack={goBack} {...screenProps} />;
      case SCREENS.GAME:
        return <GameScreen navigate={navigate} goBack={goBack} {...screenProps} />;
      case SCREENS.GAME_MODE:
        return <GameModeScreen navigate={navigate} goBack={goBack} {...screenProps} />;
      default:
        return <SplashScreen navigate={navigate} goBack={goBack} {...screenProps} />;
    }
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {renderScreen()}
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});