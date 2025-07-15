import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#5856D6',
    text: '#333333',
    background: '#F8F9FA',
    cardBackground: '#FFFFFF',
    border: '#E1E8ED',
};

export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    globalMargin: {
        paddingHorizontal: 20,
        flex: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: colors.text,
    },
});
