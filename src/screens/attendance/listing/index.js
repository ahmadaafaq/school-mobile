/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';

import API from '../../../apis';
import LoadingAnimationModal from "../../common/LoadingAnimationModal";
import ListingComponent from './ListingComponent';

import { setSchoolStudents } from "../../../redux/actions/StudentAction";
import { useCommon } from "../../../hooks/common";
import { Utility } from "../../../utility";

const AttendanceListing = () => {
    const schoolStudents = useSelector(state => state.schoolStudents);

    const theme = useTheme();
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    const { setAsyncStorage } = Utility();

    // writing this function separately because an effect function must no return anything besides a function, used for cleanup, 
    // you are returning promise, getting this error when calling directly
    const setMenuInAsyncStorage = useCallback(() => {
        setAsyncStorage('menu', { selected: 'Student' });
    }, []);

    useFocusEffect(
        useCallback(() => {
            setMenuInAsyncStorage();
        }, [])
    );

    useEffect(() => {
        getPaginatedData(0, 100, setSchoolStudents, API.StudentAPI, { class_id: params.class_id, section: params.section });
    }, [params.class_id]);


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
            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} style={{ flexGrow: 1 }}>
                <ListingComponent class_id={params.class_id} section_id={params.section} />
            </ScrollView>

            {schoolStudents?.loading ? <LoadingAnimationModal /> : null}
        </SafeAreaView>
    )
};

export default AttendanceListing;
