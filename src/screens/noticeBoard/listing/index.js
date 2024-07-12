/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect } from 'react';
import { useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

import API from '../../../apis';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';

import { SIZES } from '../../../assets/constants';
import { setNoticeBoards } from "../../../redux/actions/NoticeBoardAction";
import { useCommon } from "../../../hooks/common";
import { Utility } from "../../../utility";

const NoticeBoardListing = () => {
    const allNotices = useSelector(state => state.allNotices);

    const theme = useTheme();
    const { getPaginatedData } = useCommon();
    const { setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = useCallback(() => {
        setAsyncStorage('menu', { selected: 'Homework' });
    }, []);

    useFocusEffect(
        useCallback(() => {
            setMenuInAsyncStorage();
        }, [])
    );

    useEffect(() => {
        if (!allNotices?.listData?.length) {
            getPaginatedData(0, 10, setNoticeBoards, API.NoticeBoardAPI);
        }
    }, [allNotices?.listData?.length]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.white[900]
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}
                style={{ flexGrow: 1 }}
            >
                <ListingComponent />
            </ScrollView>
            {allNotices?.loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    );
};

export default NoticeBoardListing;
