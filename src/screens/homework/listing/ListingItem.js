/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";

import { FONT, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const ListingItem = ({ item, index, theme }) => {
    const [formattedDate, setFormattedDate] = useState(null);

    useEffect(() => {
        if (item?.created_at) {
            const dateStr = item.created_at;
            const dateObj = new Date(dateStr.replace(' ', 'T'));
            const formatOptions = {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                weekday: 'long',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            };
            const formatted = dateObj.toLocaleString('en-US', formatOptions);
            setFormattedDate(formatted);
        }
    }, [item]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            height: WINDOW_HEIGHT / 5.5,
            width: WINDOW_WIDTH - 25,
            borderWidth: 2,
            borderRadius: 8,
            borderColor: theme.colors.soapBlue[500],
            paddingHorizontal: 10,
        },
        titleText: {
            color: theme.colors.whiteSmoke[500],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: '400',
            textTransform: 'capitalize'
        },
        subText: {
            color: theme.colors.whiteSmoke[600],
            backgroundColor: theme.colors.blue[600],
            fontSize: SIZES.smallMedium,
            paddingLeft: SIZES.smallMedium,
            paddingVertical: 4,
            borderRadius: 8,
            alignSelf: "flex-end",
            width: '35%',
            letterSpacing: 0.12,
            textTransform: 'capitalize'
        },
        detailBtn: {
            top: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '80%',
            height: 40,
            borderRadius: 4,
            backgroundColor: theme.colors.green[500],
            marginBottom: 10,
            zIndex: 1
        },
        detailText: {
            color: theme.colors.white[500],
            fontFamily: FONT.regular,
            fontSize: 15,
            letterSpacing: 0.12,
            fontWeight: '400'
        },
        icon: {
            color: theme.colors.white[500]
        },
    });

    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            // height: WINDOW_HEIGHT / 5.5,
            width: WINDOW_WIDTH - 25,
            borderRadius: 5,
            margin: 10,
            paddingVertical: 10,
            backgroundColor: theme.colors.grayishRed[400],
        }}>
            <View style={{ borderWidth: 0 }}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.titleText}>{item.subjectName}</Text>
                <Text style={styles.subText}>Due date</Text>
                <Text style={styles.titleText}>{formattedDate}</Text>
            </View>
            <View style={{
                width: 100,
            }}>
                {/* <TouchableOpacity onPress={() => handlePress(item)}
                    style={styles.detailBtn}
                >
                    <Text style={styles.detailText}> Details </Text>
                    <FontAwesome5 name="chevron-right" size={16} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(item)}
                    style={[styles.detailBtn, {
                        backgroundColor: theme.colors.red[400]
                    }]}
                >
                    <Text style={styles.detailText}> Edit </Text>
                    <FontAwesome5 name="chevron-right" size={16} style={styles.icon} />
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};

ListingItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object
};

export default ListingItem;
