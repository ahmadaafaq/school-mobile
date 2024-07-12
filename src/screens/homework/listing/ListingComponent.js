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

import { useCallback, useEffect, useRef, useState, memo } from 'react';
import { FlatList, Text, TouchableOpacity, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD2Colors, MD3Colors, useTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';
import { FONT, SIZES } from "../../../assets/constants";
import { setTeacherHomeworks } from "../../../redux/actions/HomeworkAction";
import { useCommon } from "../../../hooks/common";

const ListingComponent = ({ api, class_id, section_id, subject_id, page, setPage, userRole }) => {
    const [homeworkData, setHomeworkData] = useState([]);
    const { listData } = useSelector(state => state.teacherHomework);

    const flatListRef = useRef(null);
    const router = useRouter();
    const theme = useTheme();
    const params = useLocalSearchParams();
    const { getPaginatedData } = useCommon();
    let SIZE = 10;

    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 10,
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

    // useEffect(() => {
    //     if (!listData?.length) {
    //         getPaginatedData(0, 100, setTeacherHomeworks, API.HomeworkAPI, params.userRole === 'parent' ?
    //  { class_id: params.class_id, section: params.section } : params.userRole === 'teacher' ? null : null);
    //     }
    // }, [listData?.length]);

    useEffect(() => {
        if (class_id && section_id && subject_id) {
            console.log('fetch homeworks conditionally', page);
            getPaginatedData(page, SIZE, setTeacherHomeworks, api.HomeworkAPI,
                userRole === 'parent' ? { class_id, section: section_id, subject_id } :
                    userRole === 'teacher' ? null : null, false);
        } else {
            console.log('coming in else for homework', page)
            // getPaginatedData(page, SIZE, setTeacherHomeworks, api.HomeworkAPI, {}, false);
        }
    }, [class_id, section_id, subject_id, page]);
    console.log(params, 'these are para,s')

    const handlePress = () => {
        router.push(`/${userRole}/(homework)/homeworkForm`);
    };

    useEffect(() => {
        console.log("USE EFFECT");
        if (page > 0 && listData?.rows?.length) {
            setHomeworkData([
                ...homeworkData,
                ...listData.rows
            ]);
        } else if (listData?.rows?.length) {
            setHomeworkData(listData.rows);
            console.log('scroll to top')
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    }, [listData?.rows]);

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
            height: 50,
            borderRadius: 18,
            marginBottom: 15,
            backgroundColor: theme.colors.grayishRed[500]
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
            {userRole === 'teacher' &&
                <TouchableOpacity onPress={() => handlePress()}
                    style={styles.touchableOpacityStyles}
                >
                    <Text style={styles.touchableOpacityText}> Create New Homework </Text>
                </TouchableOpacity>
            }
            <Chip icon="information" style={{ backgroundColor: MD2Colors.grey400, marginBottom: 10 }} selectedColor={MD3Colors.error70} type="flat">
                <Text style={{ color: MD2Colors.black }}>{listData?.count || 0} Homeworks Found</Text>
            </Chip>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }} >
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
    api: PropTypes.any,
    class_id: PropTypes.any,
    page: PropTypes.number,
    setPage: PropTypes.func,
    section_id: PropTypes.any,
    subject_id: PropTypes.any,
    userRole: PropTypes.string
};

export default memo(ListingComponent);
