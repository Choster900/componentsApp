import React, { useState } from 'react'
import CustomView from '../../components/ui/CustomView'
import CustomSwitch from '../../components/ui/CustomSwitch';
import Separator from '../../components/ui/Separator';

export default function SwitchScreen() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


    const [switchStates, setSwitchStates] = useState({
        isActive: true,
        isHungry: false,
        isHappy: false,
    })

    return (
        <CustomView style={{ marginTop: 50, marginHorizontal: 10, borderRadius: 10, padding: 10, backgroundColor: '#fff' }}>
            <CustomSwitch
                isOn={switchStates.isActive}
                onChange={() => setSwitchStates(prev => ({ ...prev, isActive: !prev.isActive }))}
                text="Enable Feature"
            />
            <Separator />
            <CustomSwitch
                isOn={switchStates.isHungry}
                onChange={() => setSwitchStates(prev => ({ ...prev, isHungry: !prev.isHungry }))}
                text="Are you hungry?"
            />
            <Separator />

            <CustomSwitch
                isOn={switchStates.isHappy}
                onChange={() => setSwitchStates(prev => ({ ...prev, isHappy: !prev.isHappy }))}
                text="Are you happy?"
            />
            <Separator />

        </CustomView>
    )
}
