
import { useFonts } from 'expo-font';
import { FreckleFace_400Regular } from '@expo-google-fonts/freckle-face';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import SplashScreen from './screens/SplashScreen';
import UserDetails from './screens/UserDetails';
import DebugScreen from './screens/DebugScreen';
import { StrictMode } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    FreckleFace_400Regular, // Load the Freckle Face font
  });
  if (!fontsLoaded) {
    // return <Text>sss</Text>; // Show loading screen while the font loads
  }
  return (
    <>
    <StrictMode>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="splash" component={SplashScreen} />
            <Stack.Screen name="userdetails" component={UserDetails} />
            <Stack.Screen name="debugscreen" component={DebugScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
      </StrictMode>
    </>
  );
}
