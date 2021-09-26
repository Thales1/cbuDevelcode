import { useFocusEffect } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageViewer from 'react-native-image-zoom-viewer';
import { TextInputMask } from 'react-native-masked-text';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useEffect } from 'react/cjs/react.development';
import cadastraUser from '../../bd/Cadastro/cadastraUser';
import upImages from '../../bd/Cadastro/upImage';
import editaUser from '../../bd/Editar/editaUser';
import getImage from '../../bd/Editar/getImage';

export default function Cadastro({ route }) {
    const [codigo, setCodigo] = useState("");
    const [nome, setNome] = useState("");
    const [dataNasc, setDataNasc] = useState("");
    const [photoUser, setPhotoUser] = useState("");

    const [userEdit, setUserEdit] = useState(false);

    var params = route.params

    if (params != undefined && !userEdit) {
        setNome(params.userEdit.nome);
        setDataNasc(params.userEdit.dataNasc);
        setCodigo(params.userEdit.codigo);
        setUserEdit(true);
        getImageEdit();
    }

    async function getImageEdit() {
        setPhotoUser([{ uri: await getImage(params.userEdit.idUser) }]);
    }

    function openGalery() {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            forceJpg: true,
        }).then(image => {
            setPhotoUser([{
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime
            }]);
        }).catch((error) => { console.log(error) });
    }

    function openCamera() {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            forceJpg: true
        }).then(image => {
            setPhotoUser([{
                uri: image.path,
                width: image.width,
                height: image.height,
                mime: image.mime
            }]);
        }).catch((error) => { console.log(error) });
    }


    useFocusEffect(
        useCallback(() => {
            if (userEdit) {
                setUserEdit(false);
            }
        }, [])
    )

    function verificaCampos() {
        var erros = "";
        if (nome == "") {
            erros = "\nNome"
        }
        if (codigo == "") {
            erros += "\nCodigo";
        }
        if (dataNasc == "" || dataNasc.length != 10) {
            erros += "\nData Nascimento"
        }
        if (photoUser == "") {
            erros += "\nFoto"
        }

        if (erros != "") {
            throw erros
        }
    }

    function cadastrarUsuario() {
        try {
            verificaCampos();
            cadastraUser(nome, codigo, dataNasc, photoUser);
            cancelarEdit();
        } catch (e) {
            Alert.alert("Atenção!", "Os seguintes campos não foram preenchidos corretamente: " + e)
        }
    }

    function editarUsuario() {
        try {
            verificaCampos();
            editaUser(nome, codigo, dataNasc, photoUser, params.userEdit.idUser);
            cancelarEdit();
        } catch (e) {
            Alert.alert("Atenção!", "Os seguintes campos não foram preenchidos corretamente: " + e)
        }
    }

    function cancelarEdit() {
        route.params = undefined;
        setUserEdit(false);
        setNome("");
        setCodigo("");
        setDataNasc("")

        setPhotoUser("");
    }

    return (
        <ScrollView style={styles.boxForm}>
            <Text style={styles.label}>Código</Text>
            <TextInput
                style={styles.input}
                placeholder={"Ex: 502"}
                value={codigo}
                autoCapitalize={'none'}
                keyboardType='phone-pad'
                onChangeText={(codigo) => setCodigo(codigo)}
            />

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder={"Ex: João da Silva"}
                value={nome}
                autoCapitalize={'words'}
                onChangeText={(nome) => setNome(nome)}
            />

            <Text style={styles.label}>Data Nascimento</Text>
            <TextInputMask
                placeholder="Ex: 01/01/2000"
                keyboardType='phone-pad'
                style={styles.input}
                type={'datetime'}
                options={{
                    format: 'DD/MM/YYYY'
                }}
                value={dataNasc}
                onChangeText={(dataNasc) => { setDataNasc(dataNasc) }}
            />
            <Text style={styles.label}>Escolha sua foto:</Text>
            <View style={styles.boxPhoto}>

                <TouchableOpacity style={styles.btnGaleria} onPress={openGalery}>
                    <FontAwesome5Icon
                        name={"image"}
                        color={"#FFF"}
                        size={15}
                    />
                    <Text style={styles.txtGaleria}>Galeria</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnCamera} onPress={openCamera}>
                    <FontAwesome5Icon
                        name={"camera"}
                        color={"#FFF"}
                        size={15}
                    />
                    <Text style={styles.txtCamera}>Câmera</Text>
                </TouchableOpacity>
            </View>

            {
                photoUser ? <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={photoUser} /> : <></>
            }
            {
                userEdit ?
                    //Button Editar
                    <>
                        <TouchableOpacity style={styles.btnEditar} onPress={editarUsuario}>
                            <FontAwesome5Icon
                                name={"pencil-alt"}
                                color={"#FFF"}
                                size={15}
                            />
                            <Text style={styles.txtEditar}>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnEditar, { backgroundColor: '#f00' }]} onPress={cancelarEdit}>
                            <Text style={styles.txtEditar}>Cancelar</Text>
                        </TouchableOpacity>
                    </>
                    :
                    //Button Cadastrar
                    <TouchableOpacity style={styles.btnCadastrar} onPress={cadastrarUsuario}>
                        <FontAwesome5Icon
                            name={"pencil-alt"}
                            color={"#FFF"}
                            size={15}
                        />
                        <Text style={styles.txtCadastrar}>Cadastrar</Text>
                    </TouchableOpacity>
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 52,
        borderColor: '#ddd',
        borderRadius: 25,
        borderWidth: 1,
        paddingLeft: '5%',
        backgroundColor: '#fff',
    },
    boxForm: {
        padding: '7%',
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#444',
        fontWeight: 'bold',
        marginTop: '5%',
        marginLeft: "5%"
    },
    boxPhoto: {
        flexDirection: 'row',
    },
    btnGaleria: {
        padding: '4%',
        backgroundColor: '#11B00B',
        borderRadius: 9,
        marginVertical: '3%',
        marginBottom: '5%',
        marginHorizontal: '10%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnCamera: {
        padding: '4%',
        backgroundColor: 'rgb(0, 122, 255)',
        borderRadius: 9,
        marginVertical: '3%',
        marginBottom: '5%',
        marginHorizontal: '10%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtGaleria: {
        color: '#FFF',
        marginLeft: '8%'
    },
    txtCamera: {
        color: '#FFF',
        marginLeft: '8%',
    },
    btnCadastrar: {
        borderRadius: 9,
        marginVertical: '3%',
        marginBottom: '10%',
        marginHorizontal: '30%',
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: '#f00',
        padding: '4.5%',
    },
    txtCadastrar: {
        color: '#fff',
        alignSelf: 'center',
        marginLeft: '8%',
    },
    btnEditar: {
        borderRadius: 9,
        marginVertical: '3%',
        marginBottom: '5%',
        marginHorizontal: '35%',
        flexDirection: 'row',
        alignContent: 'center',
        backgroundColor: '#E2B707',
        padding: '4.5%',
    },
    txtEditar: {
        color: '#fff',
        alignSelf: 'center',
        marginLeft: '8%',
    },

})