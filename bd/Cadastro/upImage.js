import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage';

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = RNFetchBlob.polyfill.Blob;

export default async function upImages(image, idUser) {

    await storage().ref(`${idUser}/imagem.jpg`).putFile(image[0].uri);


}