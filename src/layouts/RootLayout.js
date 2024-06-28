/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState } from "react";
import { useColorScheme } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

import { useFonts } from "expo-font";
import { Stack, SplashScreen, useLocalSearchParams } from "expo-router";

import store from "../redux/store";

import { COLORS, FONT, SIZES } from "../assets/constants";
import { LightScheme } from "../theme/lightScheme";
import { DarkScheme } from "../theme/darkScheme";
import { Utility } from "../utility";

export {
    // Catch any errors thrown by the Layout component
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: 'index',
};

// If this method is called before the splash screen is hidden, then the splash screen will remain visible until the 
//SplashScreen.hideAsync() function has been invoked
SplashScreen.preventAutoHideAsync();

const LightTheme = {
    ...MD3LightTheme,
    colors: LightScheme,
};

const DarkTheme = {
    ...MD3DarkTheme,
    colors: DarkScheme,
};

const RootLayout = () => {
    const [loaded, error] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf")
    });
    const [userRole, setUserRole] = useState();
    const { getAsyncStorage } = Utility();      //remove them

    // const params = useLocalSearchParams();
    // const [paperTheme, setPaperTheme] = useState(LightTheme);
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'light' ? LightTheme : DarkTheme;

    useEffect(() => {
        const getAuthInfo = async () => {
            const authInfo = await getAsyncStorage("auth");
            console.log('auth function ', authInfo);
            if (authInfo?.role) {
                const role = authInfo?.role == 4 ? 'teacher' : authInfo?.role == 5 ? 'parent' : null;
                setUserRole(role);
                console.log('auth function if condition', authInfo.role);
            }
        }
        getAuthInfo();
    }, []);

    // Expo Router uses Error Boundaries to catch errors in the navigation tree
    useEffect(() => {
        if (loaded || error) {
            // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    // Prevent rendering until the font has loaded or an error was returned
    if (!loaded && !error) {
        return null;
    }
    // console.log(userRole, 'userrole in root layout')

    // Render the children routes now that all the assets are loaded
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={paperTheme}>
                <Stack screenOptions={{
                    headerShadowVisible: false,
                    // headerTintColor: COLORS.tealBlue,
                    // headerStyle: { backgroundColor: COLORS.whiteSnow, borderBottomWidth: 0 },
                    headerTitleStyle: { fontWeight: FONT.boldStyle, fontSize: SIZES.xmLarge }
                }}
                >
                    <Stack.Screen
                        name='index'
                        options={{
                            headerTitle: "The Skolar",
                            headerShown: false
                        }}
                    />
                    {/* this (tabs) group is for the nested Tabs Layout inside of our Stack Layout which will also contain the Drawer Layout
                        only on Home Tab */}
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerTitle: 'The Skolar',
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="teacher"
                        options={{
                            headerTitle: 'The Skolar',
                            headerShown: false
                        }}
                    />
                    <Stack.Screen
                        name="parent"
                        options={{
                            headerTitle: 'The Skolar',
                            headerShown: false
                        }}
                    />
                </Stack>
            </PaperProvider>
        </StoreProvider>
    );
};

export default RootLayout;
