/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Drawer } from 'expo-router/drawer';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import { SIZES } from "../assets/constants";

const DrawerLayout = () => {
    const theme = useTheme();

    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: theme.colors.yaleBlue[500],
                drawerType: "front",
                swipeEdgeWidth: 0,
                swipeEnabled: false
            }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: 'Dashboard',
                    headerTitle: "School CRM",
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerTintColor: theme.colors.yaleBlue[500],
                    headerStyle: { backgroundColor: theme.colors.grayishWhite[500], borderBottomWidth: 0 },
                    headerTitleStyle: { fontWeight: '600', fontSize: SIZES.xmLarge },
                    drawerStyle: { fontSize: 12, backgroundColor: theme.colors.whiteSnow[500] },
                    drawerIcon: ({ color }) => <Ionicons name="home" size={18} color={color} />
                }}
            />
            <Drawer.Screen
                name='(student)'
                options={{
                    title: "Student",
                    headerShadowVisible: false,
                    headerTintColor: theme.colors.yaleBlue[500],
                    headerStyle: { backgroundColor: theme.colors.grayishWhite[500], borderBottomWidth: 0 },
                    headerTitleStyle: { fontWeight: '600', fontSize: SIZES.large },
                    drawerStyle: { fontSize: 12, backgroundColor: theme.colors.whiteSnow[500] },
                    drawerIcon: ({ color }) => <FontAwesome5 name="user-graduate" size={18} color={color} />
                }}
            />
            <Drawer.Screen
                name='teacherListing'
                options={{
                    title: "Teacher",
                    headerShadowVisible: false,
                    headerTintColor: theme.colors.yaleBlue[500],
                    headerStyle: { backgroundColor: theme.colors.grayishWhite[500], borderBottomWidth: 0 },
                    headerTitleStyle: { fontWeight: '600', fontSize: SIZES.large },
                    drawerStyle: { fontSize: 12, backgroundColor: theme.colors.whiteSnow[500] },
                    drawerIcon: ({ color }) => <FontAwesome5 name="user-tie" size={18} color={color} />
                }}
            />
            <Drawer.Screen
                name='slide2'
                options={{
                    drawerLabel: "Drawer Two",
                    title: "Drawer Two",
                    headerTintColor: theme.colors.yaleBlue[500],
                    drawerStyle: { fontSize: 12, backgroundColor: theme.colors.whiteSnow[500] },
                    drawerIcon: ({ color }) => <Ionicons name="md-settings" size={18} color={color} />
                }}
            />
        </Drawer>
    )
};

export default DrawerLayout;
