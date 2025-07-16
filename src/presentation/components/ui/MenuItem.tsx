import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../config/theme/theme";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useNavigation } from "@react-navigation/native";
import Separator from "./Separator";
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface Props {
    name: string;
    icon: IoniconsName;
    component: string;

    isFirst?: boolean;
    isLast?: boolean;
}

export const MenuItem = ({ name, icon, component, isFirst, isLast }: Props) => {

    const navigation = useNavigation<any>();
    return (
        <>
            <Pressable
                onPress={() => navigation.navigate(component)}
            >

                <View style={{
                    ...styles.container,
                    backgroundColor: colors.cardBackground,
                    ...(isFirst && { borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingTop: 10 }),
                    ...(isLast && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 10 }),
                }}>

                    <Ionicons name={icon} size={25} color={colors.primary} style={{ marginRight: 10 }} />
                    <Text style={{ color: colors.text }}>{name}</Text>
                    <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} style={{ marginLeft: 'auto' }} />

                </View>
            </Pressable>

            {
                !isLast && <Separator styles={{ marginHorizontal: 10 }} />
            }
        </>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
    }
});
