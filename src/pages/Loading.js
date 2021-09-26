import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react/cjs/react.production.min';

export default function Loading({ navigation }) {

    setTimeout(() => {
        navigation.navigate("Main");
    }, 1000)


    return (
        <View style={styles.viewSplash}>
            <View style={styles.contentSplash}>
                <Text style={styles.titleSplash}>C B U</Text>
                <Text style={styles.subTitleSplash}>Cadastro Básico de Usuários</Text>
                <ActivityIndicator size={40} color={"#fff"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleSplash: {
        color: "#fff",
        fontSize: 50,
    },
    subTitleSplash: {
        color: "#fff",
        fontSize: 20
    },
    viewSplash: {
        backgroundColor: "#E2B707",
        width: "100%",
        height: "100%",
    },
    contentSplash: {
        top: "35%",
        alignItems: "center",
        display: "flex"
    }
})