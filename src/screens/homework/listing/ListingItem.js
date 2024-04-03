/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

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
    console.log(date.toLocaleString('en-US', formatOptions));

    const handlePress = (item) => {
        console.log("listing item", item);

        // router.push({
        //     pathname: '/salonDetail',
        //     params: {
        //         code: item.salon_code
        //     }
        // });
    };

    const styles = StyleSheet.create({
        container: {
            height: WINDOW_HEIGHT / 5.5,
            width: WINDOW_WIDTH - 25,
            borderWidth: 2,
            borderRadius: 8,
            borderColor: theme.colors.soapBlue[500],
            margin: 15,
            paddingHorizontal: 10,
        },
        titleText: {
            color: theme.colors.soapBlue[600],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: '400',
            textTransform: 'capitalize'
        },
        subText: {
            color: theme.colors.white[600],
            fontSize: SIZES.small,
            paddingLeft: SIZES.small,
            paddingTop: SIZES.xSmall,
            letterSpacing: 0.12,
            textTransform: 'capitalize'
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handlePress(item)}
                style={{ height: '100%' }}
            >
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.titleText}>{item.subject_id}</Text>
                <Text style={styles.subText}>Due date</Text>
                <Text style={styles.titleText}>{date.toLocaleString('en-US', formatOptions)}</Text>
            </TouchableOpacity>
        </View>
    );
};


ListingItem.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object
};

export default ListingItem;
