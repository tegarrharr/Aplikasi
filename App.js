import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AnalResult from './screens/AnalResult';
import FormScreen from './screens/FormScreen';
import CheckScreen from './screens/CheckScreen';
import ResultScreen from './screens/ResultScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Apps" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={HomeScreen} />
        {/* <Stack.Screen name="Hasil Analisa" component={AnalResult} /> */}
        <Stack.Screen name="Form Screen" component={FormScreen} />
        <Stack.Screen name="Check Screen" component={CheckScreen} />
        <Stack.Screen name="Result Screen" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
