/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState } from 'react';
import { Platform, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome5 } from '@expo/vector-icons';

import { COLORS, ALIGNMENT, SIZES, FONT } from "../../assets/constants";

const CustomDatePicker = ({ label }) => {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(undefined);

    const handleDateChange = (event, selectedDate) => {
        setDate(selectedDate);
        setShowDatePicker(false);
    };

    return (
        <View style={styles.subContainer}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}
                style={styles.opacityStyle}
            >
                <Text style={{
                    color: COLORS.white[700], fontFamily: FONT.medium, letterSpacing: 0.12
                }}> {date ? date.toJSON().slice(0, 10).replace(/-/g, '/') : label} </Text>
                <FontAwesome5 name='calendar-alt' color={COLORS.white[700]} size={22} />
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
    )
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
        backgroundColor: COLORS.white[500],
        margin: SIZES.smallMedium,
        marginTop: SIZES.xSmall,
        paddingHorizontal: 16
    }
});

export default CustomDatePicker;
