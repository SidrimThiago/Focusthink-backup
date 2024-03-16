import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import CalendarPicker from 'react-native-calendar-picker'

export default function Profile() {
  const spinValue = new Animated.Value(0)

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 17000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const [timeList, setTimeList] = useState([])
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDate, setSelectedDate] = useState()

  useEffect(() => {
    getTime()
  }, [])

  const getTime = () => {
    const timeList = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourFormatted = hour.toString().padStart(2, '0')
        const minuteFormatted = minute.toString().padStart(2, '0')
        const time = `${hourFormatted}:${minuteFormatted}`
        timeList.push({ time })
      }
    }
    setTimeList(timeList)
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#633DE8', '#1C233F']} style={styles.background}>
        <Animated.Image
          style={{
            transform: [{ rotate: spin }],
            width: 800,
            position: 'absolute',
          }}
          source={require('../../assets/backgroundgames.png')}
        />
        <View style={{ backgroundColor: '#633DE8' }} classname="mb-50">
          <Text>Selecione a data</Text>
          <CalendarPicker
            style={{ borderRadius: 15 }}
            onDateChange={setSelectedDate}
            minDate={Date.now()}
            todayBackgroundColor="#4B9DDB"
            todayTextStyle="#fff"
            selectedDayColor="#FFEBCD"
            selectedDayTextColor="#ffffff"
          />
        </View>

        <View>
          <Text>Selecione o horário</Text>
          <FlatList
            data={timeList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={
                    selectedTime === item.time
                      ? styles.selectedTime
                      : styles.unselectedTime
                  }
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
        </View>
        {/* Renderizar as tasks */}
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    paddingHorizontal: 18,
    color: '#fff',
    backgroundColor: '#4CAF50',
  },
  unselectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 99,
    paddingHorizontal: 18,
    color: '#fff',
  },
})
