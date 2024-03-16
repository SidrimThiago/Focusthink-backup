import { useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const storage = new MMKV();

const useAuth = () => {
  const [authed, setAuthed] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = storage.getString('userToken');
      const userDataString = storage.getString('user');
      const userData = JSON.parse(userDataString);

      if (token && userData) {
        setAuthed(true);
      } else {
        setAuthed(false);
        Alert.alert('Credenciais inválidas', 'Faça login para acessar esta página.');
        navigation.navigate('login');
      }
    };

    checkAuth();
  }, []);

  return authed;
};

export default useAuth;
