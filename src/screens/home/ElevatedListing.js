/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions, View, Image, Text, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

import { ALIGNMENT, COLORS, FONT, SIZES } from "../../assets/constants";
import ProgressBar from '../common/ProgressBar';

const WINDOW_WIDTH = Dimensions.get("window").width;

const ElevatedListing = () => {
    const theme = useTheme();

    const listingData = [
        {
            name: 'Attendance',
            icon: 'calendar-alt',
            bg: theme.colors.blue[500],
            progress: 0.8
        },
        {
            name: 'Result',
            icon: 'clipboard-list',
            bg: theme.colors.grayishGreen[500],
            progress: 0.7
        },
        {
            name: 'Holidays',
            icon: 'plane-departure',
            bg: theme.colors.grayishRed[500],
            progress: 0.5
        },
        {
            name: 'Buses',
            icon: 'bus-alt',
            bg: theme.colors.grayishYellow[500],
            progress: 0.7
        }
    ];

    //optimization props for better performance
    const flatListOptimizationProps = {
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 2
    };

    const styles = {
        listContainer: {
            flex: 1,
            marginTop: 20,
            marginHorizontal: 25,
            paddingVertical: 10,
            backgroundColor: theme.colors.whiteSnow[500],
            borderRadius: 14,
            // borderWidth: 2
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
        lineContainer: {
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            margin: SIZES.smallMedium,
            marginTop: 8
        },
        listItemContainer: {
            height: 70,
            width: WINDOW_WIDTH / 1.25,
            // borderWidth: 0.5,
            // borderRadius: 8,
            marginBottom: 30,
            marginLeft: 12,
            borderColor: COLORS.white[700],
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center'
        },
        iconContainer: {
            height: 70,
            width: 70,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center'
        },
        iconStyle: {
            color: theme.colors.whiteSmoke[500]
        },
        subContainer: {
            width: '72%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginLeft: 15,
            // borderWidth: 2
        },
        serviceName: {
            color: theme.colors.black[500],
            fontFamily: FONT.bold,
            fontSize: 13,
            letterSpacing: 0.015,
            textTransform: 'capitalize'
        }
    };

    return (
        <SafeAreaView style={styles.listContainer}>
            <Text style={styles.nameText}> Important </Text>
            <View style={styles.lineContainer}>
                <View style={{ flex: 1, height: 0.5, elevation: 0.5, backgroundColor: theme.colors.grayishWhite[500] }}></View>
            </View>

            <ScrollView horizontal={true} style={{ width: "100%" }}>
                <FlatList
                    data={listingData}
                    keyExtractor={(item, index) => index.toString()}
                    pagingEnabled={true}
                    {...flatListOptimizationProps}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.listItemContainer}>
                                <View style={[styles.iconContainer,
                                { backgroundColor: item.bg }
                                ]}>
                                    <FontAwesome5 name={item.icon} size={20} style={styles.iconStyle} />
                                </View>

                                <View style={styles.subContainer}>
                                    <Text style={styles.serviceName}> {item.name} </Text>
                                    <ProgressBar progress={item.progress} color={item.bg} />

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={[styles.serviceName,
                                        { color: theme.colors.grayishWhite[700] }
                                        ]}> This Month </Text>
                                        <Text style={[styles.serviceName,
                                        { color: theme.colors.grayishWhite[700] }
                                        ]}> {`${item.progress * 100} / 100%`} </Text>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                />
            </ScrollView>
        </SafeAreaView >
    );
};

export default ElevatedListing;
