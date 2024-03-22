/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react'
import { StyleSheet, View, Image, TextInput, SafeAreaView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import ButtonComponent from '../../../components/button'
import { useNavigation, useRoute } from '@react-navigation/native'
import ReturnButton from '../../../components/returnbutton'
import axios from 'axios'
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV({ id: 'user' })

export default function ProfileCreate({ navigation, route }) {
  const [nomeUser, setNomeUser] = useState('')
  const [historicMedic, setHistoricMedic] = useState('')
  const { newUser } = route.params
  const { newProfissional } = route.params

  function userData() {
    const previousScreenName =
      navigation.getState().routes[navigation.getState().index - 1].name

    switch (previousScreenName) {
      case 'Cadastro':
        return { ...newUser, nomeUser, historicMedic }
      case 'Profissional':
        return { ...newProfissional, nomeUser, historicMedic }
      default:
        return {}
    }
  }

  const CreateUser = () => {
    const user = userData()
    const token = Math.random().toString(36).substring(2, 12)

    user.token = token
    storage.set('userToken', token)

    if (newUser) {
      storage.set(
        'user',
        JSON.stringify({
          type: 'Paciente',
          CompleteName: user.nome,
          userName: user.nomeUser,
          userEmail: user.email,
          historicMedic: user.historicMedic,
          phone: user.telefone,
          adress: user.endereco,
          userPassword: user.password,
        }),
      )
    } else if (newProfissional) {
      storage.set(
        'user',
        JSON.stringify({
          type: 'Profissional',
          CompleteName: user.nomeCompleto,
          userName: user.nomeUser,
          userEmail: user.email,
          historicMedic: user.historicMedic,
          phone: user.telefone,
          adress: user.endereco,
          'Crm/Crp': user.Crm,
          specialty: user.Especialidade,
          ProfissionalPassword: user.password,
        }),
      )
    }
    console.log(token)
    navigation.navigate('login')
  }

  return (
    <SafeAreaView style={styles.container} className="w-full h-screen flex-1">
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
        className="flex-1"
      >
        <ReturnButton onPress={() => navigation.navigate('Cadastro')} />

        <Image
          alt="image"
          style={styles.tinyLogo}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/icon.png')}
        />
        <Image
          alt="image"
          style={styles.profileImage}
          className="justify-end"
          resizeMode="contain"
          source={require('../../../assets/profilecreate.png')}
        />

        <View className="relative justify-center h-12 mb-3 pr-14 pl-14 mt-5 w-full">
          <TextInput
            style={styles.input}
            onChangeText={setNomeUser}
            value={nomeUser}
            placeholder="Nome de usuário"
            placeholderTextColor={'white'}
            className=" bg-inherit w-full h-full border-b-2 text-white border-white p-2 text-lg pl-4"
          />
        </View>

        <View className="relative h-28 mb-3 pr-12 pl-12 w-full">
          <TextInput
            style={styles.textArea}
            multiline={true}
            numberOfLines={8}
            onChangeText={setHistoricMedic}
            value={historicMedic}
            placeholder="Adicionar histórico médico"
            className="bg-white w-full h-full rounded-2xl border border-white p-2 text-sm pl-4"
          />
        </View>

        <View className="text-center justify-center items-center w-full px-16 top-14 mt-20">
          <ButtonComponent title="Finalizar" onPress={() => CreateUser()} />
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
