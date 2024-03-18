/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'expo-router';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';

import { COLORS, FONT, SIZES } from "../../../assets/constants";
import { setMenuItem } from "../../../redux/actions/MenuItemAction";

import { Utility } from "../../../utility";

const ListingComponent = () => {
    const dispatch = useDispatch();
    const { listData } = useSelector(state => state.teacherHomework);
    const router = useRouter();
    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 2,
        keyExtractor: useCallback(e => e.id, []),
        getItemLayout: useCallback(
            (_, index) => ({
                index,
                length: WINDOW_WIDTH,
                offset: index * WINDOW_WIDTH,
            }),
            []
        )
    };
    const { getAsyncStorage } = Utility();

    useEffect(() => {
        const getSelectedMenu = async () => {
            const selectedMenu = await getAsyncStorage('menu');
            console.log('inside useEffect homework listing', selectedMenu);
            dispatch(setMenuItem(selectedMenu?.selected));
        };
        getSelectedMenu();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => router.push('/(homework)/homeworkForm')}>
                <Text> New Homewolk </Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
                {listData?.count} Homeworks Found
            </Text>
            <ScrollView horizontal={true} style={{ width: "100%" }} >
                <FlatList
                    data={listData?.rows}
                    renderItem={ListingItem}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    {...flatListOptimizationProps}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        color: "#000000"
    },
    headerText: {
        color: COLORS.moonstoneBlue,
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.medium,
        paddingLeft: SIZES.medium,
        paddingBottom: 4,
        letterSpacing: 0.12,
        fontWeight: '400'
    }
});

export default ListingComponent;
