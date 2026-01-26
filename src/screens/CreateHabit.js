import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Keyboard } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CreateHabit = () => {

  const navigation = useNavigation()

  const [selectedColor, setSelectedColor] = useState('');
  const [title, setTitle] = useState('');

  const colors = [
    '#FF5733', // Red
    '#FFD700', // Gold
    '#5D76A9',
    '#1877F2', // Medium Purple
    '#32CD32', // Lime Green
    '#CCCCFF', // Tomato
    '#4169E1', // Royal Blue
  ];

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  async function addHabit() {
    try{
      const habitDetails = {
        title:title,
        color:selectedColor,
        repeatMode:'daily',
        reminder:true
      }

      const response = await axios.post(`http://localhost:3000/habits`,habitDetails)

      if(response.status === 200){
        setTitle('')

        Alert.alert('Habit Added!! Keep building')
      }
      console.log("Habit added",response)
    }catch(error){
      console.log(`Error in adding habit`,error)
    }
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', padding: 10, paddingTop: 70 }}
    >
      <Ionicons name="arrow-back" size={27} onPress={()=>navigation.goBack()} />
      <Text style={{ fontSize: 20 }}>
        Create
        <Text style={{ fontSize: 20, fontWeight: '500' }}> Habits</Text>
      </Text>
      <TextInput
        value={title}
        onChangeText={text => setTitle(text)}
        style={{
          width: '95%',
          marginTop: 15,
          padding: 15,
          borderRadius: 10,
          backgroundColor: '#E1EBEE',
        }}
        placeholder="Title"
      />
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: '500' }}>Color</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 10,
          }}
        >
          {colors?.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              onPress={() => setSelectedColor(item)}
            >
              {selectedColor === item ? (
                <AntDesign name="plussquare" size={30} color={item} />
              ) : (
                <FontAwesome name="square" size={30} color={item} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '500' }}>Repeat</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginVertical: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: '#AFDBF5',
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Daily</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: '#AFDBF5',
            padding: 10,
            borderRadius: 6,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: 'center' }}>Weekly</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 18, fontWeight: '500' }}>On these days</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 10,
        }}
      >
        {days?.map((item, index) => (
          <Pressable
            key={index}
            style={{
              width: 40,
              height: 40,
              borderRadius: 5,
              backgroundColor: '#E0E0E0',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>{item}</Text>
          </Pressable>
        ))}
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 17, fontWeight: '500' }}>Reminder</Text>
        <Text style={{ fontSize: 17, fontWeight: '500', color: '#2774AE' }}>
          Yes
        </Text>
      </View>

      <TouchableOpacity
        onPress={addHabit}
        style={{
          marginTop: 25,
          backgroundColor: '#00428c',
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text
          style={{ textAlign: 'center', fontWeight: 'bold', color: '#FFFFFF' }}
        >
          SAVE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateHabit;

const styles = StyleSheet.create({});
