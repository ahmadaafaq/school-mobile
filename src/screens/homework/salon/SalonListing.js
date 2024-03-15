import { useCallback } from "react";
import { FlatList, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { useSelector } from "react-redux";

import { COLORS, SIZES, FONT } from "../../assets/constants";
import SalonListingItem, { WINDOW_WIDTH } from "./SalonListingItem";

const SalonListing = () => {

    const { listData } = useSelector(state => state.allSalons);
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
        ),
    };

    return (
        <SafeAreaView>
            <Text style={styles.headerText}>
                {listData.length} Salons Found
            </Text>
            <ScrollView horizontal={true} style={{ width: "100%" }} >
                <FlatList
                    data={listData}
                    renderItem={SalonListingItem}
                    pagingEnabled={true}
                    keyExtractor={(item) => item.id.toString()}
                    {...flatListOptimizationProps}
                />
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    headerText: {
        color: COLORS.moonstoneBlue,
        fontSize: SIZES.mediumLarge,
        fontFamily: FONT.medium,
        paddingLeft: SIZES.medium,
        paddingBottom: 4,
        letterSpacing: 0.12,
        fontWeight: '400'
    },
});

export default SalonListing;
