import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Routes from "../Utils/Strings/routes.ts"

import LaunchStack from './LaunchStack.tsx';
import LoginStack from '../Screens/Auth/LoginStack/LoginStack.tsx';
interface navProp {
    navigation: any
}
const Stack = createStackNavigator();
const RootStack = (props: navProp) => {
    return (
        <NavigationContainer  
       
        >
            <Stack.Navigator
                initialRouteName={Routes.kLAUNCHSTACKROUTE}
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
             >
                <Stack.Screen name={Routes.kLAUNCHSTACKROUTE} component={LaunchStack} />
                <Stack.Screen name={Routes.kLOGINROUTE} component={LoginStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootStack

const styles = StyleSheet.create({})