import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { globalStyles } from '../../../config/theme/theme';

interface CustomViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
    margin?: boolean;
}

export default function CustomView({ style, children, margin }: CustomViewProps) {
    return (
        <View style={[
            globalStyles.mainContainer,
            style,
            margin ? globalStyles.globalMargin : null
        ]}>
            {children}
        </View>
    )
}
