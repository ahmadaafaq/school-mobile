/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';

import { ALIGNMENT, FONT, SIZES } from '../../theme/theme';

const CustomCheckBox = ({ label }) => {
    const [checked, setChecked] = useState(false);
    const theme = useTheme();

    const styles = StyleSheet.create({
        inputContainer: {
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            height: 50,
            borderBottomWidth: 0.8,
            borderBottomColor: theme.colors.white[700],
            backgroundColor: theme.colors.white[500],
            margin: SIZES.smallMedium,
            paddingHorizontal: SIZES.xSmall,
            marginTop: SIZES.xSmall
        },
    });

    return (
        <SafeAreaView style={styles.inputContainer}>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                    setChecked(!checked);
                }}
                color={theme.colors.blue[500]}
                uncheckedColor={theme.colors.white[700]}
            />
            <Text style={{
                fontFamily: FONT.regular,
                marginLeft: 10,
                color: theme.colors.white[700]
            }}> {label} </Text>
        </SafeAreaView>
    );
};

export default CustomCheckBox;
