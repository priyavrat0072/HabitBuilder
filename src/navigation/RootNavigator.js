import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../screens/HomeScreen'
import CreateHabit from '../screens/CreateHabit'

const Stack = createNativeStackNavigator()

const RootNavigator = () => {
  return (
   <Stack.Navigator 
        initialRouteName='CreateHabit'
        screenOptions={{headerShown:false}}
     // options={{headerShown:false}}
   >
        <Stack.Screen name='Home' component={HomeScreen}  />
        <Stack.Screen name='CreateHabit' component={CreateHabit}/>
   </Stack.Navigator>
  )
}

export default RootNavigator

const styles = StyleSheet.create({})