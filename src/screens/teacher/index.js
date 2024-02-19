/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Search from '../common/Search';
import ListingComponent from './ListingComponent';
import { Utility } from "../../utility";
import { useFocusEffect } from 'expo-router';

const TeacherScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();
    const { setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = async () => {
        await setAsyncStorage('menu', { selected: 'Teacher' });
    };

    useFocusEffect(
        React.useCallback(() => {
            setMenuInAsyncStorage();
        }, [])
    );


    const styles = {
        container: {
            flex: 1,
            paddingVertical: 2,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        boxContainer: {
            flexDirection: 'row',
            marginVertical: 10
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.magicMint[500]} />
            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} style={{ flexGrow: 1 }}>
                <Search />
                <ListingComponent />

            </ScrollView>
        </SafeAreaView>
    )
};

export default TeacherScreen;
