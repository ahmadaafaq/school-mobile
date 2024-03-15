/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

import Search from '../../common/Search';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';

import { Utility } from "../../../utility";

const SalonPage = () => {
    const [searchTerm, setSearchTerm] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const { setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = useCallback(() => {
        setAsyncStorage('menu', { selected: 'Homework' });
    }, [setAsyncStorage]);

    useFocusEffect(
        useCallback(() => {
            setMenuInAsyncStorage();
        }, [setMenuInAsyncStorage])
    );

    // Simulating data fetching delay
    useEffect(() => {
        const dataFetchDelay = setTimeout(() => {
            setLoading(false);
        }, 7000);

        return () => clearTimeout(dataFetchDelay);      // useEffect will clear the timeout when the component unmounts
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 2,
            backgroundColor: theme.colors.grayishWhite[500]
        },
        boxContainer: {
            flexDirection: 'row',
            marginVertical: 10
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={theme.colors.magicMint[500]} />
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}
                style={{ flexGrow: 1 }}
            >
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <ListingComponent />
            </ScrollView>
            {loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    );
};

export default SalonPage;
