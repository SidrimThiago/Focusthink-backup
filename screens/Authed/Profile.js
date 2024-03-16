import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { MMKV } from 'react-native-mmkv'
import useAuth from '../../hooks/useAuth'

const storage = new MMKV()

export default function Profile() {
  // Recuperar informações do usuário do localStorage
  const userDataString = storage.getString('user')
  const userData = JSON.parse(userDataString)

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="flex-1"
      >
        <View style={styles.userInfo}>
          <Text style={styles.label}>tipo</Text>
          <Text style={styles.value}>{userData.type}</Text>

          <Text style={styles.label}>Nome de usuário:</Text>
          <Text style={styles.value}>{userData.userName}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.userEmail}</Text>

          <Text style={styles.label}>Histórico médico:</Text>
          <Text style={styles.value}>{userData.historicMedic}</Text>

          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.value}>{userData.phone}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.value}>{userData.adress}</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  userInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
})
