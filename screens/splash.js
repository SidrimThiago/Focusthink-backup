import { StyleSheet, View } from 'react-native'
import { useEffect } from 'react'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import * as Font from 'expo-font'

export default function Splash() {
  const navigation = useNavigation()

  const load = async () => {
    await Font.loadAsync({
      'Quicksand-Bold': require('../assets/Quicksand-Bold.ttf'),
      'Quicksand-Light': require('../assets/Quicksand-Light.ttf'),
      'Quicksand-Medium': require('../assets/Quicksand-Medium.ttf'),
      'Quicksand-Regular': require('../assets/Quicksand-Regular.ttf'),
      'Quicksand-SemiBold': require('../assets/Quicksand-SemiBold.ttf'),
    })

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      }),
    )
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#633DE8', '#1C233F']}
        style={styles.background}
      />
    </View>
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
})
