/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

import { FONT, SIZES } from "../assets/constants";

const TeacherLayout = () => {
    const theme = useTheme();

    return (
        <Stack screenOptions={{
            headerShadowVisible: false,
            headerTintColor: theme.colors.white[900],
            headerTitleStyle: {
                fontWeight: FONT.boldStyle,
                fontSize: SIZES.xmLarge,
                color: theme.colors.white[900]
            }
        }}
        >
            <Stack.Screen
                name={`(attendance)`}
                options={{
                    headerTitle: "Attendance",
                    headerStyle: {
                        backgroundColor: theme.colors.blue[600]
                    }
                }}
            />
            <Stack.Screen
                name={`(homework)`}
                options={{
                    headerTitle: "Homework",
                    headerStyle: { backgroundColor: theme.colors.grayishRed[600] }
                }}
            />
            <Stack.Screen
                name={`(student)`}
                options={{
                    headerTitle: "Student",
                    headerStyle: {
                        backgroundColor: theme.colors.blue[600]
                    }
                }}
            />
            <Stack.Screen
                name={`(noticeBoard)`}
                options={{
                    headerTitle: "Notice Board",
                    headerStyle: {
                        backgroundColor: theme.colors.grayishYellow[600]
                    }
                }}
            />
            <Stack.Screen
                name={`(timeTable)`}
                options={{
                    headerTitle: "Time Table",
                    headerStyle: {
                        backgroundColor: theme.colors.grayishGreen[600]
                    }
                }}
            />
        </Stack >
    );
};

export default TeacherLayout;
