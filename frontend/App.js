import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/globalScreens/LoginScreen';
import RegistrationScreen from './screens/globalScreens/RegistrationScreen';
import HomeScreen from './screens/globalScreens/HomeScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  const ip = "192.168.137.129";
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} initialParams={{ip: ip}} />
        <Stack.Screen name="register" component={RegistrationScreen} initialParams={{ip: ip}} />
        <Stack.Screen name="home" component={HomeScreen} initialParams={{ip: ip}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
});
