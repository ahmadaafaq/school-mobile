/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import { FONT, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ListingItem = ({ item, index, theme }) => {
    const date = new Date(2024, 3, 1, 8, 0);
    const formatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };

    const handlePress = (item) => {
        console.log("listing item", item);
    };

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
        background: {
            resizeMode: 'cover', // or 'stretch
            justifyContent: 'center',
            margin: 15
        },
        titleText: {
            color: theme.colors.powderBlue[700],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: '400',
            textTransform: 'capitalize'
        },
        subText: {
            color: theme.colors.white[700],
            fontSize: SIZES.small,
            paddingLeft: SIZES.small,
            paddingTop: SIZES.xSmall,
            letterSpacing: 0.12,
            textTransform: 'capitalize'
        },
        detailBtn: {
            borderWidth: 1,
            top: 10,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'flex-end',
            width: '25%',
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
        <ImageBackground
            source={require('../../../assets/images/homework-bg.jpg')} // Replace with the path to your image
            style={styles.background}
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={() => handlePress(item)}
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
                </TouchableOpacity>
                <View style={{ top: -95, borderWidth: 1 }}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Text style={styles.titleText}>{item.subject_id}</Text>
                    <Text style={styles.subText}>Due date</Text>
                    <Text style={styles.titleText}>{date.toLocaleString('en-US', formatOptions)}</Text>
                </View>
            </View>
        </ImageBackground>
    );
};


ListingItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object
};

export default ListingItem;
