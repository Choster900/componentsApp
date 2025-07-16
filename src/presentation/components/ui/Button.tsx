import React from 'react'
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { colors } from '../../../config/theme/theme';
import { globalStyles } from '../../../config/theme/theme';


interface ButtonProps {
    text: string;
    styles?: StyleProp<ViewStyle>;
    onPress: () => void;
}

export const Button = ({ text, styles, onPress }: ButtonProps) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                globalStyles.btnPrimary,
                {
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: colors.primary,
                },
            ]}
        >
            <Text style={{ color: 'white'}}>{text}</Text>
        </Pressable>
    )
}
