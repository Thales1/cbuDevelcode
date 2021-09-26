import database from '@react-native-firebase/database';

export default async function searchUsers() {
    var lista = [];
    await database().ref("usuario/").once("value", snapshot => {
        snapshot.forEach((childItem) => {
            lista.push({
                codigo: childItem.val().codigo,
                nome: childItem.val().nome,
                dataNasc: childItem.val().dataNasc,
                idUser: childItem.key,
            })
        })
    })


    return lista;
}