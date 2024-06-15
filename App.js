import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AnalResult from './screens/AnalResult';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login Apps" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={HomeScreen} />
        <Stack.Screen name="Hasil Analisa" component={AnalResult} />
        {/* <Stack.Screen name="Controlling" component={ControlScreen} />
        <Stack.Screen name="History" component={HistoryScreen} /> */}
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
