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
import { MD2Colors } from 'react-native-paper';

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
        }
    });

    return (
        <SafeAreaView style={{
            width: WINDOW_WIDTH - 25,
            borderRadius: 5,
            margin: 10,
            padding: 10,
            backgroundColor: theme.colors.grayishGreen[500],
        }}>
            <View style={{ borderWidth: 0 }}>
                <Text style={[styles.titleText, {
                    fontSize: SIZES.large
                }]}>{item.period}</Text>
                <Text style={[styles.titleText, {
                    fontSize: SIZES.large
                }]}>{item.subject}</Text>
                <Text style={[styles.titleText, {
                    fontSize: SIZES.large
                }]}>{item.className}</Text>
                {/* <Text style={styles.titleText}>{item.description}</Text> */}
                <Text style={styles.subText}>{item.duration}</Text>
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
