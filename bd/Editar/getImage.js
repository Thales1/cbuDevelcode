import storage from '@react-native-firebase/storage';

export default async function getImage(idUser) {
    return await storage().ref(`${idUser}/imagem.jpg`).getDownloadURL();
}