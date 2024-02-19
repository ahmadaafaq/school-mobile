/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState } from 'react';
import { Platform, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';

import { ALIGNMENT, SIZES, FONT } from "../../assets/constants";

const CustomDatePicker = ({ label }) => {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(undefined);
    const theme = useTheme();

    const handleDateChange = (event, selectedDate) => {
        setDate(selectedDate);
        setShowDatePicker(false);
    };

    const styles = StyleSheet.create({
        subContainer: {
            flex: 1
        },
        opacityStyle: {
            height: 50,
            width: '92%',
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            justifyContent: "space-between",
            backgroundColor: theme.colors.white[500],
            margin: SIZES.smallMedium,
            marginTop: SIZES.xSmall,
            paddingHorizontal: 16
        },
        textStyle: {
            color: theme.colors.whiteSmoke[600],
            fontFamily: FONT.medium,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 0.12,
            marginBottom: 30
        }
    });

    return (
        <View style={styles.subContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}
                style={styles.opacityStyle}
            >
                <Text style={styles.textStyle}> {date ? date.toJSON().slice(0, 10).replace(/-/g, '/') : label} </Text>
                <FontAwesome5 name='calendar-alt' color={theme.colors.whiteSmoke[600]} size={22} />
            </TouchableOpacity>


            {showDatePicker && <DateTimePicker
                testID="dateTimePicker"
                value={date || new Date()}
                mode='date'
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate)}
            />}
        </View>
    );
};

CustomDatePicker.propTypes = {
    label: PropTypes.string
};

export default CustomDatePicker;
