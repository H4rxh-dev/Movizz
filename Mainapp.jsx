// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Botttomtab from './Botttomtab';
import Detail from './src/screen/Detail';


const Stack = createNativeStackNavigator();

export default function Mainapp() {
 
 
 
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{headerShown:false,animation:"fade_from_bottom"}}>
        <Stack.Screen name="Bottomtab" component={Botttomtab} />
        <Stack.Screen name="Detail" component={Detail} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}