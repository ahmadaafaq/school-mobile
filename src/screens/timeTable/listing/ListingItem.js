/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { View, Text, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import { FONT, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ListingItem = ({ item, index, theme }) => {

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
            color: theme.colors.powderBlue[800],
            fontFamily: FONT.regular,
            fontSize: SIZES.small,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: '600',
            textTransform: 'capitalize'
        },
        subText: {
            color: theme.colors.white[700],
            fontSize: SIZES.small,
            paddingLeft: SIZES.small,
            paddingTop: SIZES.xSmall,
            letterSpacing: 0.12,
            textTransform: 'capitalize'
        }
    });

    return (
        <SafeAreaView style={{
            width: WINDOW_WIDTH - 25,
            borderRadius: 20,
            margin: 10,
            padding: 10,
            backgroundColor: theme.colors.grayishGreen[200],
            borderWidth: 1,
            borderColor: "grey",
            elevation: 5
        }}>
            <View style={{ borderWidth: 0 }}>
                <Text style={styles.titleText}>
                    Period    :   {item.period}</Text>
                <Text style={styles.titleText}>
                    Time       :    {item.duration}</Text>
                <Text style={styles.titleText}>
                    Class      :   {item.className}</Text>
                <Text style={styles.titleText}>
                    Subject  :   {item.subject}</Text>
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
