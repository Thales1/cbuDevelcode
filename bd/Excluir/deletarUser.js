import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';

export default async function deletarUser(idUser) {
    await database().ref(`usuario/${idUser}`).remove();

    await storage().ref(`${idUser}/imagem.jpg`).delete();
    Alert.alert("Sucesso", "Usuário excluído com sucesso!")
}