/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { useTheme, MD3Colors } from 'react-native-paper';

import { FONT, SIZES } from '../../assets/constants';

const CustomPressable = ({ onPress, title, value, iconSource, width = '50%' }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        icon: {
            height: SIZES.medium,
            width: SIZES.medium,
            marginTop: SIZES.small,
            tintColor: theme.colors.brightBlue[300]
        },
        touchableOpacityStyles: {
            height: 70,
            width: width,
            backgroundColor: theme.colors.whiteSmoke[500],
            borderColor: theme.colors.grayishWhite[700],
            borderRightWidth: title !== 'Subject' ? 1 : 0,
            elevation: 20,
            shadowColor: theme.colors.brightBlue[700]
        },
        titleTextStyles: {
            color: MD3Colors.tertiary50,
            fontFamily: FONT.medium,
            fontSize: 16,
            marginLeft: 20,
            marginRight: 35
        },
        valueTextStyles: {
            color: theme.colors.grayishWhite[700],
            fontFamily: FONT.regular,
            fontSize: 13,
            marginTop: -4
        }
    });

    return (
        <TouchableOpacity onPress={onPress} style={styles.touchableOpacityStyles}>
            <View style={{
                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
                height: value ? '45%' : '90%'
            }}>
                <Text style={styles.titleTextStyles}>{title}</Text>
                <Image source={iconSource} style={styles.icon} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 40 }}>
                <Text style={styles.valueTextStyles}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
};

CustomPressable.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    value: PropTypes.string,
    iconSource: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.string
};

export default CustomPressable;
