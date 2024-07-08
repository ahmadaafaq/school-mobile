/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Drawer } from 'expo-router/drawer';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

import { SIZES } from "../assets/constants";
import { Utility } from '../utility';

const DrawerLayout = () => {
    const router = useRouter();
    const theme = useTheme();

    const { setAsyncStorage } = Utility();

    const handleLogoutPress = () => {
        setAsyncStorage('auth', null)
        router.push("/");
    };

    return (
        <Drawer
            screenOptions={{
                drawerActiveTintColor: theme.colors.yaleBlue[500],
                drawerType: "front",
                swipeEdgeWidth: 0,
                swipeEnabled: false,
            }}
            style={{ backgroundColor: 'black' }}
        >
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: 'Dashboard',
                    headerTitle: "",
                    headerTitleAlign: 'center',
                    headerShadowVisible: false,
                    headerTintColor: theme.colors.yaleBlue[100], // topbar text color
                    headerStyle: { backgroundColor: theme.colors.blue[600], borderBottomWidth: 0 }, //topbar background color
                    headerTitleStyle: { fontWeight: '600', fontSize: SIZES.xmLarge },
                    drawerStyle: { fontSize: 12, backgroundColor: theme.colors.blue[100] }, // drawer background color
                    drawerIcon: ({ color }) => <Ionicons name="home" size={18} color={color} />,
                    headerLeft: () => { },  // to hide drawer icon(3 lines on Left)
                    headerRight: () => (
                        <Ionicons
                            name="log-out-outline"
                            size={24}
                            color={theme.colors.yaleBlue[100]}
                            style={{ paddingRight: 10 }}
                            onPress={handleLogoutPress}
                        />
                    )
                }}
            />
            {/* <Drawer.Screen
                name='teacherListing'
                options={{
                    title: "",
                    headerShadowVisible: false,
                    headerTintColor: theme.colors.yaleBlue[500],
                    headerStyle: { backgroundColor: theme.colors.grayishWhite[500], borderBottomWidth: 0 },
                    headerTitleStyle: { fontWeight: '600', fontSize: SIZES.large },
                    drawerStyle: { fontSize: 12, backgroundColor: theme.colors.whiteSnow[500] }
                }}
            /> */}
            <Drawer.Screen
                name='(student)'
                options={{
                    title: "Students",
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
    );
};

export default DrawerLayout;
