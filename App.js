import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { FreckleFace_400Regular } from '@expo-google-fonts/freckle-face';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
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
  GAME_MODE: 'gamemodescreen'
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [screenProps, setScreenProps] = useState({});
  
  const [fontsLoaded, fontError] = useFonts({
    'FreckleFace-Regular': FreckleFace_400Regular,
    'Roboto-Regular': Roboto_400Regular,
    'Roboto-Medium': Roboto_500Medium,
  });

  // Navigation handler
  const navigate = (screenName, props = {}) => {
    setCurrentScreen(screenName);
    setScreenProps(props);
  };

  // Font loading state handling
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  if (fontError) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading fonts. Please restart the app.</Text>
      </View>
    );
  }

  // Render the current screen based on state
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.SPLASH:
        return <SplashScreen navigate={navigate} {...screenProps} />;
      case SCREENS.USER_DETAILS:
        return <UserDetails navigate={navigate} {...screenProps} />;
      case SCREENS.DEBUG:
        return <DebugScreen navigate={navigate} {...screenProps} />;
      case SCREENS.GAME:
        return <GameScreen navigate={navigate} {...screenProps} />;
      case SCREENS.GAME_MODE:
        return <GameModeScreen navigate={navigate} {...screenProps} />;
      default:
        return <SplashScreen navigate={navigate} {...screenProps} />;
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
    backgroundColor: '#fff'
  }
});