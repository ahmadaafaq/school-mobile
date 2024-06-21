/* eslint-disable react/display-name */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Tabs } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default () => {
    const theme = useTheme();

    return (
        <Tabs
            screenOptions={{ tabBarActiveTintColor: theme.colors.yaleBlue[500] }}
        >
            <Tabs.Screen
                name="(homeTabDrawer)"
                options={{
                    headerTitle: "Tab-List",
                    headerShown: false,
                    tabBarLabel: "Dashboard",
                    tabBarStyle: {
                        backgroundColor: theme.colors.whiteSnow[500], paddingBottom: 8,
                        paddingTop: 2, fontSize: 12, display: "none"
                    },
                    tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={18} color={color} />
                }}
            />
            {/* <Tabs.Screen
                name="quick"
                options={{
                    headerTitle: "Quick Links",
                    headerShown: false,
                    tabBarLabel: "Quick",
                    tabBarStyle: { backgroundColor: theme.colors.whiteSnow[500], paddingBottom: 8, paddingTop: 2, fontSize: 12 },
                    tabBarIcon: ({ color }) => <FontAwesome5 name="layer-group" size={18} color={color} />
                }}
            /> */}
        </Tabs>
    );
};
