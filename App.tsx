
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './src/navigation/RootNavigator'
import {ModalPortal} from 'react-native-modals'

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
      <ModalPortal/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({

})