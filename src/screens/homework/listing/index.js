/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';

import API from '../../../apis';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';

import { setTeacherHomeworks } from "../../../redux/actions/HomeworkAction";
import { useCommon } from "../../../hooks/common";
import { Utility } from "../../../utility";
import CustomDropdown from '../../common/CustomDropdown';

const HomeworkListing = () => {
    const teacherHomework = useSelector(state => state.teacherHomework);
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
        if (!teacherHomework?.listData?.length) {
            getPaginatedData(0, 10, setTeacherHomeworks, API.HomeworkAPI);
        }
    }, [teacherHomework?.listData?.length]);

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
                <View style={{ flexDirection: 'row' }}>
                    <CustomDropdown data={[1, 2, 3, 4]} placeholder='Class' setSelected={Math.random()} width={'50%'} />
                    <CustomDropdown data={[1, 2, 3, 4]} placeholder='Section' setSelected={Math.random()} width={'30%'} />
                    <CustomDropdown data={[1, 2, 3, 4]} placeholder='Subject' setSelected={Math.random()} />
                </View>
                <ListingComponent />
            </ScrollView>
            {teacherHomework?.loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    );
};

export default HomeworkListing;
