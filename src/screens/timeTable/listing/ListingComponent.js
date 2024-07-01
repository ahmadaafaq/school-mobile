/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD3Colors, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';
import { useCommon } from "../../../hooks/common";

import { FONT, SIZES } from "../../../assets/constants";
import { setTimeTables } from "../../../redux/actions/TimeTableAction";
import API from '../../../apis';

const ListingComponent = ({ daysOfWeek, selected, showDayModal, setShowDayModal }) => {
    const { listData } = useSelector(state => state.allTimeTables);
    const theme = useTheme();
    const flatListRef = useRef(null);
    const { getPaginatedData } = useCommon();
    const params = useLocalSearchParams();
    console.log('params', params);

    const currentDate = new Date();
    const currentDay = currentDate.getDay() - 1;

    const timeTableCond = {};

    if (params?.userRole === 'teacher') {
        timeTableCond.teacherId = params?.id;
    } else if (params?.userRole === 'parent') {
        timeTableCond.classId = params?.class_id;
        timeTableCond.sectionId = params?.section;
    }

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

    useEffect(() => {
        console.log('get timetable', selected, daysOfWeek[currentDay]);
        getPaginatedData(0, 80, setTimeTables, API.TimeTableAPI,
            {
                ...timeTableCond,
                day: selected ? selected : daysOfWeek[currentDay]
            });
    }, [selected]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20
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
    console.log('selected aaavvvccc', selected, listData);

    return (
        <SafeAreaView style={styles.container}>
            <Chip icon="information"
                style={{ color: theme.colors.brightBlue[500], backgroundColor: theme.colors.grayishGreen[300], marginBottom: 20, elevation: 5 }}
                selectedColor={MD3Colors.error70}
                type="flat"
                onPress={() => setShowDayModal(!showDayModal)}
            >
                <Text style={{ color: theme.colors.brightBlue[500] }}>
                    {selected || daysOfWeek[currentDay]}
                </Text>
            </Chip>
            {!listData?.rows?.length ?
                <View style={{ justifyContent: 'center' }}>
                    <Text style={{}}> No Data Found</Text>
                </View>
                :
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }} ref={flatListRef}>
                    <FlatList
                        data={listData?.rows}
                        renderItem={({ item, index }) => <ListingItem item={item} index={index} theme={theme} flatListRef={flatListRef} userRole={params?.userRole} />}
                        pagingEnabled={true}
                        keyExtractor={(item) => item.period.toString()}
                        {...flatListOptimizationProps}
                    />
                </ScrollView>
            }
        </SafeAreaView>
    );
};

export default ListingComponent;
// onPress={() => handlePress(item, "class_name", setHomeworkClassData, "class_id")} key={index}
