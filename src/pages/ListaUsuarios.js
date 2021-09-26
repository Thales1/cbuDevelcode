import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, StyleSheet, FlatList, Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import SearchInput, { createFilter } from 'react-native-search-filter';
import searchUsers from '../../bd/Pesquisa/searchUsers';
import deletarUser from '../../bd/Excluir/deletarUser';

const KEYS_TO_FILTER = ['nome', 'codigo'];

export default function ListaUsuarios({ navigation }) {

    const [searchTerm, setSearchTerm] = useState('');
    const [lista, setLista] = useState([]);
    const [filteredLista, setFilteredLista] = useState([]);

    useEffect(() => {
        pesquisaUser();

    }, [])

    useEffect(() => {
        setFilteredLista(lista.filter(createFilter(searchTerm, KEYS_TO_FILTER)))
    }, [searchTerm, lista])

    async function pesquisaUser() {
        setLista(await searchUsers());
    }

    async function deleteUser(id) {
        Alert.alert("Excluir", "Deseja mesmo excluir esse usuário?", [
            {
                onPress: () => { deletarUser(id); pesquisaUser() },
                text: "Sim",
                style: 'default',
            },
            {
                text: "Não",
                style: 'cancel',
            }
        ])
    }

    function flatRender(user) {
        return (
            <View key={user.codigo} style={styles.emailItem}>
                <View style={styles.boxUser}>
                    <View style={{ width: '83%' }}>

                        <Text style={{
                            fontWeight: 'bold', fontSize: 16, color: '#0080FF'
                        }}>

                            {"Codigo: " + user.codigo}
                            {'\n' + 'Nome: ' + user.nome}
                            {'\n' + 'Data Nascimento: ' + user.dataNasc}
                        </Text>

                    </View>
                    <TouchableHighlight underlayColor={false}
                        onPress={() => { navigation.navigate("Cadastro", { userEdit: user }) }}
                        style={styles.iconProfile}
                    >
                        <>
                            <FontAwesome5Icon
                                name={'pencil-alt'}
                                size={20}
                                color={'#0080FF'}
                            />
                        </>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={false}
                        onPress={() => { deleteUser(user.idUser) }}
                        style={[styles.iconProfile, { marginLeft: '4%' }]}
                    >
                        <>
                            <FontAwesome5Icon
                                name={'trash'}
                                size={20}
                                color={'#f00'}
                            />
                        </>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    function searchUpdated(term) {
        setSearchTerm(term);
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.inputLupaIcon}>
                    <SearchInput
                        onChangeText={(term) => { searchUpdated(term) }}
                        textBreakStrategy={'highQuality'}
                        style={styles.searchInput}
                        placeholder="Busque por nome ou código"
                        placeholderTextColor='#444'

                    >
                    </SearchInput>
                </View>
                <FlatList
                    data={filteredLista}
                    renderItem={({ item }) => flatRender(item)}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    extraData={lista}
                />
            </View>

        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start'
    },
    emailItem: {
        padding: 5,
    },
    emailSubject: {
        color: 'rgba(0,0,0,0.5)',
    },
    searchInput: {
        margin: '3%',
        paddingHorizontal: '5%',
        borderWidth: 0.5,
        borderRadius: 5,
        backgroundColor: '#FFF',
        fontSize: 15,
        width: '100%',
        alignItems: 'center',
    },
    inputLupaIcon: {
        paddingLeft: '3%',
        paddingRight: '8%',
        backgroundColor: '#E2B707',
    },
    iconProfile: {
        alignSelf: 'center',
        alignItems: 'center'
    },
    textVerPerfil: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    radioButton: {
        marginVertical: '3%',
        marginLeft: '25%',
    },
    boxUser: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#0080FF',
        marginTop: 5,
        backgroundColor: '#FFF'
    }
});