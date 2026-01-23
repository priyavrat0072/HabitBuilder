import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

  const [option, setoption] = useState('Today')

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 10, paddingTop: 70 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Ionicons name='logo-foursquare' size={27} color='#000' />
        <AntDesign name='plus' size={24} color='#000' />
      </View>

      <Text style={{ marginTop: 5, fontSize: 23, fontWeight: '500' }}> Habits</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 8 }}>
        <Pressable onPress={()=>setoption('Today')}
          style={{ backgroundColor: option == 'Today' ? '#E0FFFF' : 'transparent', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 25 }}>
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>Today</Text>
        </Pressable>
        <Pressable onPress={()=>setoption('Weekly')}
        style={{ backgroundColor: option == 'Weekly' ? '#E0FFFF' : 'transparent', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 25 }}>
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>Weekly</Text>
        </Pressable>
        <Pressable onPress={()=>setoption('Overall')}
        style={{ backgroundColor: option == 'Overall' ? '#E0FFFF' : 'transparent', paddingHorizontal: 10, paddingVertical: 8, borderRadius: 25 }}>
          <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>Overall</Text>
        </Pressable>
      </View>

    </ScrollView>

  )
}

export default HomeScreen

const styles = StyleSheet.create({})