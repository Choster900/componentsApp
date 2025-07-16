import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

interface SeparatorProps {
    styles?: StyleProp<ViewStyle>;
}

export default function Separator({ styles }: SeparatorProps) {
    return (
        <View style={[
            {
                height: 1,
                backgroundColor: '#E0E0E0',
                marginVertical: 10,
            },
            styles
        ]}>
        </View>
    )
}
