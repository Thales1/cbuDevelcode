import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import Cadastro from './src/pages/Cadastro';
import Loading from './src/pages/Loading';
import ListaUsuarios from './src/pages/ListaUsuarios';


const MainBottomTabs = createBottomTabNavigator();
const MainBottomTabsScreen = () => {
    return (
        <MainBottomTabs.Navigator
            initialRouteName={'Cadastro'}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'Cadastro') {
                        iconName = 'user-plus';
                    } else if (route.name == "ListaUsuarios") {
                        iconName = "clipboard-list"
                    }
                    return (
                        <FontAwesome5
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                headerShown: false
            })}
        >
            <MainBottomTabs.Screen
                name='Cadastro'
                component={Cadastro}
            />

            <MainBottomTabs.Screen
                name='ListaUsuarios'
                component={ListaUsuarios}
            />
        </MainBottomTabs.Navigator >
    )
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
    return (
        <RootStack.Navigator
            initialRouteName='Loading'
            screenOptions={() => ({
                headerShown: false
            })}
        >
            <RootStack.Screen
                name="Main"
                component={MainBottomTabsScreen}
            />
            <RootStack.Screen
                name="Loading"
                component={Loading}
            />
        </RootStack.Navigator>
    )
}


const Routes = () => {

    return (

        <NavigationContainer >
            <RootStackScreen />
        </NavigationContainer>

    );
};

export default Routes;