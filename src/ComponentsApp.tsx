import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Navigator } from './presentation/navigator/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function App() {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    )
}
