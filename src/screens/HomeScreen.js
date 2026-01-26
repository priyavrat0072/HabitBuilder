import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
// import {
//   BottomModal,
//   ModalContent,
//   ModalTitle,
//   SlideAnimation,
// } from 'react-native-modals';

const HomeScreen = () => {
  const [option, setoption] = useState('Today');
  const navigation = useNavigation();
  const [habits, setHabits] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState();

  const currentDay = new Date()
    .toLocaleDateString('en-US', { weekday: 'short' })
    .slice(0, 3);
  console.log(`Current Day---`, currentDay);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const deleteHabit = async () => {
    try {
      const habitId = selectedHabit._id;
      const response = await axios.delete(
        `http://localhost:3000/habits/${habitId}`,
      );
      setHabits(response.data);
      // await fetchHabits()
    } catch (error) {
      console.log('error:', error);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHabits();
    }, []),
  );

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/habitslist`);
      setHabits(response.data);
    } catch (error) {
      console.log('Error is fetching habits', error);
    }
  };
  console.log(`Habits---`, habits);

  const handleLongPress = habitId => {
    const selectedHabit = habits?.find(habit => habit._id == habitId);
    setSelectedHabit(selectedHabit);
    setIsModalVisible(true);
  };

  const handleCompletion = async () => {
    try {
      const habitId = selectedHabit?._id;
      const updatedCompletion = {
        ...selectedHabit?.completed,
        [currentDay]: true,
      };
      await axios.put(`http://localhost:3000/habits/${habitId}/completed`, {
        completed: updatedCompletion,
      });
      await fetchHabits();
      setIsModalVisible(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const filteredHabits = habits?.filter(habit => {
    return !habit.completed || !habit.completed[currentDay];
  });
  console.log(`Filtered Habits---`, filteredHabits);

    const getCompletedDays = (completedObj) => {
      if(completedObj && typeof completedObj === "object"){
          return Object.keys(completedObj).filter((day) => completedObj[day]);
      }

      return [];
  }

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          padding: 10,
          paddingTop: 70,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Ionicons name="logo-foursquare" size={27} color="#000" />
          <AntDesign
            name="plus"
            size={24}
            color="#000"
            onPress={() => navigation.navigate('CreateHabit')}
          />
        </View>

        <Text style={{ marginTop: 5, fontSize: 23, fontWeight: '500' }}>
          {' '}
          Habits
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 8,
          }}
        >
          <Pressable
            onPress={() => setoption('Today')}
            style={{
              backgroundColor: option == 'Today' ? '#E0FFFF' : 'transparent',
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
              Today
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setoption('Weekly')}
            style={{
              backgroundColor: option == 'Weekly' ? '#E0FFFF' : 'transparent',
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
              Weekly
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setoption('Overall')}
            style={{
              backgroundColor: option == 'Overall' ? '#E0FFFF' : 'transparent',
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderRadius: 25,
            }}
          >
            <Text style={{ textAlign: 'center', color: 'gray', fontSize: 14 }}>
              Overall
            </Text>
          </Pressable>
        </View>

        {option == 'Today' &&
          (filteredHabits.length > 0 ? (
            <View>
              {filteredHabits?.map((item, index) => (
                <Pressable
                  onLongPress={() => handleLongPress(item._id)}
                  key={index}
                  style={{
                    marginVertical: 10,
                    backgroundColor: item?.color,
                    padding: 12,
                    borderRadius: 24,
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: '500',
                      color: '#FFFFFF',
                    }}
                  >
                    {item?.title}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View
              style={{
                marginTop: 150,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 'auto',
              }}
            >
              <Image
                style={{ width: 60, height: 60, resizeMode: 'cover' }}
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/128/10609/10609386.png',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 10,
                  textAlign: 'center',
                }}
              >
                No habits for today
              </Text>

              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  marginTop: 10,
                  textAlign: 'center',
                }}
              >
                No habits for today. Create One?
              </Text>

              <Pressable
                onPress={() => navigation.navigate('CreateHabit')}
                style={{
                  backgroundColor: '#0071c5',
                  marginTop: 20,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  borderRadius: 15,
                }}
              >
                <Text style={{ color: '#FFFFFF' }}>Create</Text>
              </Pressable>
            </View>
          ))}
        {option == 'Weekly' && (
          <View>
            {habits?.map((habit, index) => (
              <Pressable
                key={index}
                style={{
                  marginTop: 10,
                  backgroundColor: habit.color,
                  padding: 15,
                  borderRadius: 24,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      color: '#FFFFFF',
                    }}
                  >
                    {habit.title}
                  </Text>
                  <Text style={{ color: '#FFFFFF' }}>{habit.repeatMode}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    marginVertical: 10,
                  }}
                >
                  {days.map((day, index) => {
                    const isCompleted = habit.completed && habit.completed[day];
                    return (
                      <Pressable key={index}>
                        <Text
                          style={{
                            color: day === currentDay ? 'red' : 'white',
                          }}
                        >
                          {day}
                        </Text>
                        {isCompleted ? (
                          <FontAwesome
                            name="circle"
                            size={27}
                            style={{ marginTop: 12 }}
                            color="#FFFFFF"
                          />
                        ) : (
                          <Feather
                            name="circle"
                            size={27}
                            style={{ marginTop: 12 }}
                            color="#FFFFFF"
                          />
                        )}
                      </Pressable>
                    );
                  })}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {option === "Overall" && (
          <View>
            {habits?.map((habit, index) => (
              <>
                <Pressable
                  style={{
                    marginVertical: 10,
                    backgroundColor: habit.color,
                    padding: 15,
                    borderRadius: 24,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "500",
                        color: "white",
                      }}
                    >
                      {habit.title}
                    </Text>
                    <Text style={{ color: "white" }}>{habit.repeatMode}</Text>
                  </View>

                
                </Pressable>

                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                    <Text>Completed On</Text>
                    <Text>{getCompletedDays(habit.completed).join(", ")}</Text>
                </View>
              </>
            ))}
          </View>
        )}
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(!isModalVisible)}
        onBackButtonPress={() => setIsModalVisible(!isModalVisible)}
        swipeDirection="down"
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            padding: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 280,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 10,
              textAlign: 'center',
            }}
          >
            Choose Option
          </Text>

          <Pressable
            onPress={handleCompletion}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
            }}
          >
            <Ionicons name="checkmark-circle-outline" size={27} />
            <Text>Completed</Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
            }}
          >
            <Feather name="skip-forward" size={27} />
            <Text>Skip</Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
            }}
          >
            <EvilIcons name="pencil" size={27} />
            <Text>Edit</Text>
          </Pressable>

          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
            }}
          >
            <EvilIcons name="archive" size={27} color="#000" />
            <Text>Archive</Text>
          </Pressable>

          <Pressable
            onPress={deleteHabit}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: 10,
            }}
          >
            <MaterialIcons name="delete-outline" size={27} />
            <Text>Delete</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
