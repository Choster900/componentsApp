import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import Animation101Screen from '../screens/animations/Animation101Screen';
import Animation102Screen from '../screens/animations/Animation102Screen';
import SwitchScreen from '../screens/switches/SwitchScreen';
import TextInputScreen from '../screens/inputs/TextInputScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Animation101Screen" component={Animation101Screen} />
            <Stack.Screen name="Animation102Screen" component={Animation102Screen} />
            <Stack.Screen name="SwitchScreen" component={SwitchScreen} />
            <Stack.Screen name="TextInputScreen" component={TextInputScreen} />
        </Stack.Navigator>
    );
}
