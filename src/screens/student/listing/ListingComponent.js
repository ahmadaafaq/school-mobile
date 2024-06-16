/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback, useRef } from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { Chip, MD2Colors, MD3Colors, useTheme } from 'react-native-paper';

import { ListingTable, WINDOW_WIDTH } from './ListingTable';

import { FONT, SIZES } from "../../../assets/constants";


const ListingComponent = () => {
    // const dispatch = useDispatch();
    const theme = useTheme();
    const flatListRef = useRef(null);
    const { listData } = useSelector(state => state.schoolStudents);

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        touchableOpacityStyles: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '50%',
            height: 50,
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
            <Chip icon="school" style={{ backgroundColor: MD2Colors.grey400, marginBottom: 10 }} selectedColor={MD3Colors.error70} type="flat">
                <Text style={{color: MD2Colors.black}}>{listData?.count || 0} Students Found</Text>
            </Chip>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ width: "100%" }} ref={flatListRef}>
                <FlatList
                    data={listData?.rows}
                    renderItem={({ item, index }) => <ListingTable item={item} index={index} theme={theme} flatListRef={flatListRef} />}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    {...flatListOptimizationProps}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ListingComponent;
