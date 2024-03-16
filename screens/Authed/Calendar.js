import { React, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  FontAwesome5,
  MaterialIcons,
  Entypo,
  Feather,
} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CalendarPicker from 'react-native-calendar-picker'

export default function Calendar() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="justify-start flex-1"
      >
        <View>
          <CalendarPicker
            className="bg-blue-700 p-20 w-56"
            style={{ borderRadius: 15 }}
            onDateChange={this.onDateChange}
            minDate={Date.now()}
            todayBackgroundColor="#4B9DDB"
            todayTextStyle="#fff"
            selectedDayColor="#FFEBCD"
            selectedDayTextColor="#ffffff"
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  quicksand: {
    fontFamily: 'Quicksand-Bold',
    marginBottom: 30,
  },
  quicksandRegular: {
    fontFamily: 'Quicksand-Regular',
  },
  quicksandMedium: {
    fontFamily: 'Quicksand-SemiBold',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    padding: 20,
    position: 'absolute',
    top: 55,
    right: 22,
  },
  profileImage: {
    width: 190,
    height: 190,
  },
  textArea: {
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
