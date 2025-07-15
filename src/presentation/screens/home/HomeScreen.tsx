import 'react-native-gesture-handler';

import * as React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../../config/theme/theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Title } from '../../components/ui/Title';
import { MenuItem } from '../../components/ui/MenuItem';
import { Ionicons } from '@react-native-vector-icons/ionicons';
type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface MenuItemData {
    name: string;
    icon: IoniconsName;
    component: string;
}

const animationMenuItems: MenuItemData[] = [
    {
        name: 'Animation 101',
        icon: 'cube-outline',
        component: 'Animation101Screen',
    },
    {
        name: 'Animation 102',
        icon: 'albums-outline',
        component: 'Animation102Screen',
    }
]

const uiMenuItems: MenuItemData[] = [
    {
        name: 'Switches',
        icon: 'toggle-outline',
        component: 'SwitchScreen',
    },
    {
        name: 'Alerts',
        icon: 'alert-circle-outline',
        component: 'AlertScreen',
    },
    {
        name: 'TextInputs',
        icon: 'document-text-outline',
        component: 'TextInputScreen',
    },
];

export const menuItems: MenuItemData[] = [

    {
        name: 'Pull to refresh',
        icon: 'refresh-outline',
        component: 'PullToRefreshScreen',
    },
    {
        name: 'Section List',
        icon: 'list-outline',
        component: 'CustomSectionListScreen',
    },
    {
        name: 'Modal',
        icon: 'copy-outline',
        component: 'ModalScreen',
    },
    {
        name: 'InfiniteScroll',
        icon: 'download-outline',
        component: 'InfiniteScrollScreen',
    },
    {
        name: 'Slides',
        icon: 'flower-outline',
        component: 'SlidesScreen',
    },
    {
        name: 'Themes',
        icon: 'flask-outline',
        component: 'ChangeThemeScreen',
    },
];

export const HomeScreen = () => {
    return (
        <View style={globalStyles.mainContainer}>

            <View style={globalStyles.globalMargin}>
                <ScrollView>
                    <Title text="Home" safe={true} />


                    {
                        menuItems.map((item, index) => (
                            <MenuItem key={index} {...item}
                                isFirst={index === 0}
                                isLast={index === menuItems.length - 1} />
                        ))
                    }

                    <View style={{ marginTop: 30 }} />

                    {
                        animationMenuItems.map((item, index) => (
                            <MenuItem key={index} {...item}
                                isFirst={index === 0}
                                isLast={index === animationMenuItems.length - 1} />
                        ))
                    }

                    <View style={{ marginTop: 30 }} />

                    {
                        uiMenuItems.map((item, index) => (
                            <MenuItem key={index} {...item}
                                isFirst={index === 0}
                                isLast={index === uiMenuItems.length - 1} />
                        ))
                    }

                </ScrollView>
            </View>


        </View>
    );
}
