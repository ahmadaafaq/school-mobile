/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import Box from './BoxComponent';
import ElevatedListing from './ElevatedListing';
import LoadingAnimationModal from "../common/LoadingAnimationModal";
import Search from '../common/Search';

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const theme = useTheme();

    // Simulating data fetching delay
    useEffect(() => {
        const dataFetchDelay = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(dataFetchDelay);      // useEffect will clear the timeout when the component unmounts
    }, []);


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

                <View style={styles.boxContainer}>
                    <Box title='Active Students' content='12361' growth='14 More' bg={theme.colors.grayishGreen[500]} />
                    <Box title='Active Teachers' content='361' growth='8 More' bg={theme.colors.grayishRed[500]} ml={10} mr={20} />
                </View>
                <View style={styles.boxContainer}>
                    <Box title='Active Employees' content='20' growth='2 More' bg={theme.colors.grayishYellow[500]} />
                    <Box title='Active Buses' content='12' growth='1 More' bg={theme.colors.blue[500]} ml={10} mr={20} />
                </View>

                <ElevatedListing />
            </ScrollView>
            {loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    )
};

export default HomePage;
