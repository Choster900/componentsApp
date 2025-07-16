import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'
import { globalStyles } from '../../../config/theme/theme';
import { colors } from '../../../config/theme/theme';

interface SeparatorProps {
    styles?: StyleProp<ViewStyle>;
}

export default function Separator({ styles }: SeparatorProps) {
    return (

        <View style={{
            backgroundColor: colors.cardBackground,
        }}>
            <View style={[
                {
                    height: 1,
                    backgroundColor: '#E0E0E0',
                    marginVertical: 10,
                },
                styles
            ]}>
            </View>
        </View>
    )
}
