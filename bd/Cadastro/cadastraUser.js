import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import conexao from '../conexao';
import upImages from './upImage';

export default async function cadastraUser(nome, codigo, dataNasc, photoUser) {
    var validaCodigo = true;
    await database().ref("usuario/").once("value", snapshot => {
        snapshot.forEach((childItem) => {
            if (childItem.val().codigo == codigo) {
                validaCodigo = false;
                return true;
            }
        })
    });
    if (validaCodigo) {

        const newReference = database().ref('usuario/').push();
        var message = "";
        newReference.set({
            codigo,
            nome,
            dataNasc,
        })
        await upImages(photoUser, newReference.key);

        Alert.alert("Efetuado", "Cadastro efetuado com sucesso!")
    } else {
        Alert.alert("Atenção!", "Esse código de usuário ja existe em nosso sistema!")
    }
}