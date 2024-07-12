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
import { FlatList, SafeAreaView, StyleSheet, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useTheme } from 'react-native-paper';

import ListingItem, { WINDOW_WIDTH } from './ListingItem';

import { FONT, SIZES } from "../../../assets/constants";

const ListingComponent = () => {
    const theme = useTheme();
    const { listData } = useSelector(state => state.allNotices);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        },
        headerText: {
            color: theme.colors.brightBlue[500],
            fontSize: SIZES.mediumLarge,
            fontFamily: FONT.medium,
            margin: 20,
            letterSpacing: 0.12,
            fontWeight: '600'
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            {listData?.rows && listData?.rows?.length > 0 ? (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }} >
                    <FlatList
                        data={listData?.rows}
                        renderItem={({ item, index }) => <ListingItem item={item} index={index} theme={theme} />}
                        pagingEnabled={true}
                        keyExtractor={(item) => item.id.toString()}
                        {...flatListOptimizationProps}
                    />
                </ScrollView>
            ) : (
                <View>
                    <Text style={styles.headerText}>No Data Found</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

export default ListingComponent;
