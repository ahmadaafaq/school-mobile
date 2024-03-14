/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect } from "react";
import { Alert, useColorScheme } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

import { useFonts } from "expo-font";
import { Stack, SplashScreen } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from "../assets/constants";
import { LightScheme } from "../theme/lightScheme";
import { DarkScheme } from "../theme/darkScheme";
import store from "../redux/store";

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

    // const [paperTheme, setPaperTheme] = useState(LightTheme);
    const colorScheme = useColorScheme();
    const paperTheme = colorScheme === 'light' ? LightTheme : DarkTheme;


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
                            headerTitle: "School CRM",
                            headerShown: false
                        }}
                    />
                    {/* this (tabs) group is for the nested Tabs Layout inside of our Stack Layout which will also contain the Drawer Layout
                        only on Home Tab */}
                    <Stack.Screen
                        name="(tabs)"
                        options={{
                            headerTitle: 'School CRM',
                            headerShown: false
                        }}
                    />
                    {/* test screen */}
                    <Stack.Screen
                        name='homework'
                        options={{
                            headerTitle: "Homework",
                            headerStyle: {
                                backgroundColor: COLORS.indigo[400], // Set the background color for the header
                            },
                            headerTitleStyle: {
                                color: COLORS.white[100], // Set the color for the header title
                            },
                            // headerShown: false,
                            headerRight: () => <AntDesign onPress={() => Alert.alert("Your application version is compatible")}
                                name='infocirlceo' color={COLORS.tealBlue} size={22} />
                        }}
                    />
                </Stack>
            </PaperProvider>
        </StoreProvider>
    );
};

export default RootLayout;
