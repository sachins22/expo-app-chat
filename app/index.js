import 'react-native-gesture-handler';
import * as React from 'react';
import {  NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

  //! import file 
  import Home from '@/src/Home';
  import Login from '@/src/Login';


function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

export default App;
