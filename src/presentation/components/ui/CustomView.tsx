import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { globalStyles } from '../../../config/theme/theme';

interface CustomViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export default function CustomView({ style, children }: CustomViewProps) {
    return (
        <View style={[globalStyles.mainContainer, style]}>
            {children}
        </View>
    )
}
