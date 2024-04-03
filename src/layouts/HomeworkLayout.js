/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Stack } from 'expo-router';

const HomeworkLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="homeworkListing"
                options={{ headerTitle: "Homework", headerShown: false }}
            />
            <Stack.Screen
                name="homeworkForm"
                options={{ headerTitle: "Create New" }}
            />
        </Stack>
    );
};

export default HomeworkLayout;
