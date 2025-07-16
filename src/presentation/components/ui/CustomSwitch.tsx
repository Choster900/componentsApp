import React, { useState } from 'react'
import { Switch, Text, View } from 'react-native'
import { colors } from '../../../config/theme/theme'


interface CustomSwitchProps {

    isOn: boolean
    text?: string
    onChange: () => void
}

export default function CustomSwitch({ isOn, text, onChange }: CustomSwitchProps) {
    const [isEnabled, setIsEnabled] = useState(isOn);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        onChange();
    };
    return (
        <View style={styles.switchRow}>

            {
                text && <Text style={{ color: colors.text, fontSize: 16 }}>{text}</Text>
            }

            <Switch
                thumbColor={isEnabled ? '#874bf5ff' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}

const styles = {
    switchRow: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        marginVertical: 5,
    },
};
