import React, { PropsWithChildren } from 'react'
import { StyleProp, Text, ViewStyle } from 'react-native'
import CustomView from './CustomView'
import { colors } from '../../../config/theme/theme';

interface CardProps extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}

export default function Card({ style, children }: CardProps) {
    return (
        <CustomView style={[
            {
                borderRadius: 8,
                elevation: 1,
                backgroundColor: colors.cardBackground,
                padding: 10,
            },
            style,
        ]}>
            {children}
        </CustomView>
    )
}
