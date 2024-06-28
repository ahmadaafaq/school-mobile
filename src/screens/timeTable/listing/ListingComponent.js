/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD3Colors, useTheme } from 'react-native-paper';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';
import CustomDropdown from '../../common/CustomDropdown';

import { FONT, SIZES } from "../../../assets/constants";

const ListingComponent = () => {
    const [selected, setSelected] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const { listData } = useSelector(state => state.allTimeTables);
    const theme = useTheme();

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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

    useEffect(() => {
        const filtered = listData.rows.filter((item) => item.day === selected);
        setFilteredData(filtered);
    }, [selected, listData.rows.length]);
    console.log(filteredData, 'timetable filtered')

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

    return (
        <SafeAreaView style={styles.container}>
            <Chip icon="information" style={{ color: theme.colors.brightBlue[500], backgroundColor: theme.colors.grayishGreen[300], marginBottom: 20 }} selectedColor={MD3Colors.error70} type="flat">
                <Text style={{ color: theme.colors.brightBlue[500] }}>Present Week</Text>
            </Chip>
            <CustomDropdown placeholder="Select Day" data={daysOfWeek} setSelected={setSelected} width='60%' bg={theme.colors.grayishGreen[200]} />
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }} >
                <FlatList
                    data={filteredData}
                    renderItem={({ item, index }) => <ListingItem item={item} index={index} theme={theme} />}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.period.toString()}
                // {...flatListOptimizationProps}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListingComponent;
