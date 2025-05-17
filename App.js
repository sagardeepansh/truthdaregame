import React from 'react';
import { Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import { FreckleFace_400Regular } from '@expo-google-fonts/freckle-face';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Screens
import SplashScreen from './screens/SplashScreen';
import UserDetails from './screens/UserDetails';
import DebugScreen from './screens/DebugScreen';
import GameScreen from './screens/GameScreen';
import GameModeScreen from './screens/GameModeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    FreckleFace_400Regular,
    Roboto_400Regular,
    Roboto_500Medium,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="userdetails" component={UserDetails} />
            <Stack.Screen name="debugscreen" component={DebugScreen} />
            <Stack.Screen name="gamescreen" component={GameScreen} />
            <Stack.Screen name="gamemodescreen" component={GameModeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
