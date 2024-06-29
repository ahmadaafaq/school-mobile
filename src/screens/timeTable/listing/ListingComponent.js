/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useState, useRef } from 'react';
import { FlatList, SafeAreaView, StyleSheet,ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD3Colors, useTheme } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';
import CustomDropdown from '../../common/CustomDropdown';
import { useCommon } from "../../../hooks/common";

import { FONT, SIZES } from "../../../assets/constants";
import { setTimeTables } from "../../../redux/actions/TimeTableAction";
import API from '../../../apis';
import { View } from 'react-native-web';

const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
}

const ListingComponent = () => {
    const [selected, setSelected] = useState("");
    const { listData } = useSelector(state => state.allTimeTables);
    const theme = useTheme();
    const flatListRef = useRef(null);
    const { getPaginatedData } = useCommon();
    const params = useLocalSearchParams();
    console.log('params', params);

    const currentDate = new Date();
    const currentDay = currentDate.getDay() - 1;

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // const flatListOptimizationProps = {
    //     initialNumToRender: 0,
    //     maxToRenderPerBatch: 1,
    //     removeClippedSubviews: true,
    //     scrollEventThrottle: 16,
    //     windowSize: 2,
    //     keyExtractor: useCallback(e => e.id, []),
    //     getItemLayout: useCallback(
    //         (_, index) => ({
    //             index,
    //             length: WINDOW_WIDTH,
    //             offset: index * WINDOW_WIDTH
    //         }),
    //         []
    //     )
    // };

    useEffect(() => {
        console.log('selected', selected, daysOfWeek[currentDay]);
        getPaginatedData(0, 80, setTimeTables, API.TimeTableAPI, { teacherId: params?.id, day: selected ? selected : daysOfWeek[currentDay] });
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
    console.log('listData', listData);

    return (
        <SafeAreaView style={styles.container}>
            <Chip icon="information" style={{ color: theme.colors.brightBlue[500], backgroundColor: theme.colors.grayishGreen[300], marginBottom: 20, elevation: 5 }} selectedColor={MD3Colors.error70} type="flat">
                <Text style={{ color: theme.colors.brightBlue[500] }}>Present Week</Text>
            </Chip>
            <CustomDropdown placeholder="Select Day" data={daysOfWeek} setSelected={setSelected} selected={selected || daysOfWeek[currentDay]} width={210} bg={theme.colors.grayishGreen[200]} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%", flex: 1 }} ref={flatListRef}>
                <FlatList
                    data={listData?.rows}
                    renderItem={({ item, index }) => <ListingItem item={item} index={index} theme={theme} flatListRef={flatListRef}/>}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.period.toString()}
                // {...flatListOptimizationProps}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListingComponent;
