import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import * as Routes from "../Utils/Strings/routes.ts"
import Splash from '../Components/Splash/splash.tsx';
interface launchStackProps {}
const Stack = createStackNavigator();
const LaunchStack = (prop:launchStackProps) => {
  return (
   <Stack.Navigator   screenOptions={{
    headerShown: false,
    gestureEnabled: false,
  }}>
    <Stack.Screen  name={Routes.kSPLASHROUTE}
        component={Splash}
        options={{title: 'Splash', headerShown: false}}/>
   </Stack.Navigator>
  )
}

export default LaunchStack

const styles = StyleSheet.create({})