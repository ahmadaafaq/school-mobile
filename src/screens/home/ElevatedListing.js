/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useCallback } from 'react';
import { Dimensions, View, Text, FlatList, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { ALIGNMENT, COLORS, FONT, SIZES } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;

const ElevatedListing = ({ data }) => {
    const theme = useTheme();

    //optimization props for better performance
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
        listContainer: {
            flex: 1,
            marginTop: 20,
            marginHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: theme.colors.indigo[100],
            borderRadius: 20,
            // borderWidth: 1
        },
        nameText: {
            color: theme.colors.yaleBlue[500],
            fontSize: SIZES.mediumLarge,
            fontFamily: FONT.bold,
            paddingBottom: SIZES.xSmall,
            paddingLeft: 8,
            letterSpacing: 0.12,
            fontWeight: '700',
            textTransform: 'capitalize'
        },
        listItemContainer: {
            height: 56,
            width: WINDOW_WIDTH / 1.25,
            // borderWidth: 1,
            marginBottom: 14,
            marginLeft: 12,
            borderColor: COLORS.white[700],
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center'
        },
        iconContainer: {
            height: 50,
            width: 50,
            borderRadius: 12,
            backgroundColor: theme.colors.indigo[400],
            alignItems: 'center',
            justifyContent: 'center'
        },
        subContainer: {
            width: '73%',
            justifyContent: 'space-around',
            marginLeft: 15,
            // borderWidth: 1
        },
        serviceName: {
            color: theme.colors.black[500],
            fontFamily: FONT.bold,
            fontSize: 14,
            letterSpacing: 0.015,
            textTransform: 'capitalize'
        }
    });

    return (
        <SafeAreaView style={styles.listContainer}>
            <ScrollView horizontal={true} style={{ width: "100%" }}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    pagingEnabled={true}
                    {...flatListOptimizationProps}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listItemContainer}>
                                <View style={[styles.iconContainer]}>
                                    <FontAwesome5 name='calendar-alt' size={16} color={theme.colors.whiteSmoke[500]} />
                                </View>

                                <View style={styles.subContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.serviceName,
                                        { color: theme.colors.grayishWhite[700] }
                                        ]}> {item.title} </Text>
                                        <Text style={[styles.serviceName,
                                        { color: theme.colors.grayishWhite[700] }
                                        ]}> {item.startDate} </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ElevatedListing;
