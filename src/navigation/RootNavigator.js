import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import CreateHabit from '../screens/CreateHabit'

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
  return (
   <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{headerShown:false}}
   >
        <Stack.Screen name='Home' component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name='CreateHabit' component={CreateHabit} options={{headerShown:false}}/>
   </Stack.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})