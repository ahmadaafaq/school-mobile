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

const TeacherLayout = () => {
    const theme = useTheme();

    return (
        <Stack>
            <Stack.Screen
                name={`(attendance)`}
                options={{
                    headerTitle: "Attendance",
                    headerTitleStyle: { color: theme.colors.white[100] },
                    headerStyle: {
                        backgroundColor: theme.colors.blue[500]
                    }
                }}
            />
            <Stack.Screen
                name={`(homework)`}
                options={{
                    headerTitle: "Homework",
                    headerTitleStyle: { color: theme.colors.white[100] },
                    headerStyle: { backgroundColor: theme.colors.grayishRed[500] }
                }}
            />
            <Stack.Screen
                name={`(student)`}
                options={{
                    headerTitle: "Student",
                    headerTitleStyle: { color: theme.colors.white[100] },
                    headerStyle: {
                        backgroundColor: theme.colors.blue[500]
                    }
                }}
            />
            <Stack.Screen
                name={`(noticeBoard)`}
                options={{
                    headerTitle: "Notice Board",
                    headerTitleStyle: { color: theme.colors.white[100] },
                    headerStyle: {
                        backgroundColor: theme.colors.grayishYellow[500]
                    }
                }}
            />
            <Stack.Screen
                name={`(timeTable)`}
                options={{
                    headerTitle: "Time Table",
                    headerTitleStyle: { color: theme.colors.white[100] },
                    headerStyle: {
                        backgroundColor: theme.colors.grayishGreen[500]
                    }
                }}
            />
            <Stack.Screen
                name={`(markAttendance)`}
                options={{
                    headerTitle: "Mark Attendance",
                    headerTitleStyle: { color: theme.colors.white[100] },
                    headerStyle: {
                        backgroundColor: theme.colors.grayishGreen[500]
                    }
                }}
            />
        </Stack>
    );
};

export default TeacherLayout;
