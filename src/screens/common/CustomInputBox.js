/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { SafeAreaView, StyleSheet } from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';

import { ALIGNMENT, SIZES } from '../../theme/theme';

const CustomInputBox = ({
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
    onBlur,
    error,
    underlineColor,
    activeUnderlineColor }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        inputContainer: {
            height: 50,
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            borderBottomWidth: 0.8,
            borderBottomColor: theme.colors.white[700],
            backgroundColor: theme.colors.white[500],
            margin: SIZES.smallMedium,
            marginTop: SIZES.xSmall,
            paddingHorizontal: SIZES.xSmall
        }
    });

    return (
        <SafeAreaView style={styles.inputContainer}>
            <TextInput
                style={{ flex: 1, color: theme.colors.white[500] }}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                error={error}
                underlineColor={underlineColor}
                activeUnderlineColor={activeUnderlineColor}
            />
            <HelperText type="error" visible={!!formik.touched.firstname && formik.errors.firstname}>
                Email address is invalid!
            </HelperText>
        </SafeAreaView>
    );
};

export default CustomInputBox;
