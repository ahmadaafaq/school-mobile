/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback } from 'react';
import { FlatList, SafeAreaView, StyleSheet, ScrollView, Text } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD2Colors, MD3Colors, useTheme } from 'react-native-paper';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';

import { FONT, SIZES } from "../../../assets/constants";

const ListingComponent = () => {
    const theme = useTheme();
    const { listData } = useSelector(state => state.allTimeTables);

    const flatListOptimizationProps = {
        maxToRenderPerBatch: 1,
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 10
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
            <Chip icon="information" style={{ color: theme.colors.brightBlue[500], backgroundColor: MD2Colors.green200, marginBottom: 10 }} selectedColor={MD3Colors.error70} type="flat">
                <Text style={{ color: theme.colors.brightBlue[500] }}>Present Day</Text>
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

export default ListingComponent;
