/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { useCallback, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';

import { FONT, SIZES } from "../../../assets/constants";
import { setMenuItem } from "../../../redux/actions/MenuItemAction";

import { Utility } from "../../../utility";

const ListingComponent = ({ class_id, class_name, section_id, section_name, subject_id, subject_name }) => {
    const { listData } = useSelector(state => state.teacherHomework);
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();

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
                offset: index * WINDOW_WIDTH
            }),
            []
        )
    };
    const { getAsyncStorage } = Utility();

    const handlePress = () => {
        router.push({
            pathname: '/(homework)/homeworkForm',
            params: {
                class_id: class_id,
                class_name: class_name,
                section_id: section_id,
                section_name: section_name,
                subject_id: subject_id,
                subject_name: subject_name
            }
        });
    };

    useEffect(() => {
        const getSelectedMenu = async () => {
            const selectedMenu = await getAsyncStorage('menu');
            console.log('inside useEffect homework listing', selectedMenu);
            dispatch(setMenuItem(selectedMenu?.selected));
        };
        getSelectedMenu();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        touchableOpacityStyles: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            height: 70,
            borderRadius: 18,
            marginBottom: 15,
            backgroundColor: theme.colors.brightBlue[500]
        },
        touchableOpacityText: {
            color: theme.colors.white[500],
            fontFamily: FONT.regular,
            fontSize: 15,
            letterSpacing: 0.12,
            fontWeight: '400'
        },
        headerText: {
            color: theme.colors.brightBlue[500],
            fontSize: SIZES.mediumLarge,
            fontFamily: FONT.medium,
            marginBottom: 20,
            letterSpacing: 0.12,
            fontWeight: '400'
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => handlePress()}
                style={styles.touchableOpacityStyles}
            >
                <Text style={styles.touchableOpacityText}> Create New Homework </Text>
            </TouchableOpacity>
            <Text style={styles.headerText}>
                {listData?.count} Homeworks Found
            </Text>
            <ScrollView horizontal={true} style={{ width: "100%" }} >
                <FlatList
                    data={listData?.rows}
                    renderItem={({ item, index }) => <ListingItem item={item} index={index} theme={theme} />}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    {...flatListOptimizationProps}
                />

            </ScrollView>
        </SafeAreaView>
    );
};

ListingComponent.propTypes = {
    class_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    class_name: PropTypes.string,
    section_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    section_name: PropTypes.string,
    subject_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    subject_name: PropTypes.string
};

export default ListingComponent;
