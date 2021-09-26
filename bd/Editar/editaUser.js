import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';

export default async function editaUser(nome, codigo, dataNasc, photoUser, idUser) {
    var validaCodigo = true;
    await database().ref("usuario/").once("value", snapshot => {
        snapshot.forEach((childItem) => {
            if (childItem.val().codigo == codigo && idUser != childItem.key) {
                validaCodigo = false;
                return true;
            }
        })
    });

    if (validaCodigo) {
        database().ref(`usuario/${idUser}`).update({
            nome,
            codigo,
            dataNasc
        });

        await storage().ref(`${idUser}/imagem.jpg`).putFile(photoUser[0].uri).then((resp) => { 
            console.log(resp);
        });

        Alert.alert("Efetuado", "Usuário editado com sucesso!")
    } else {
        Alert.alert("Atenção!", "Esse código de usuário ja existe em nosso sistema!")
    }

}