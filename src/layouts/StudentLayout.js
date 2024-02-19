/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Stack } from 'expo-router';

const StudentLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="studentListing"
                options={{ headerTitle: "Student", headerShown: false }}
            />
            <Stack.Screen
                name="studentForm"
                options={{ headerTitle: "Admission Form" }}
            />
        </Stack>
    );
};

export default StudentLayout;
