/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { SafeAreaView, StyleSheet } from 'react-native';
import { HelperText, useTheme, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

import { ALIGNMENT, SIZES } from '../../theme/theme';

const CustomInputBox = ({
    name,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText,
    onBlur,
    error,
    helperText,
    underlineColor,
    activeUnderlineColor
}) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        inputContainer: {
            height: 50,
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
            borderBottomWidth: 0.8,
            borderBottomColor: theme.colors.whiteSmoke[700],
            backgroundColor: theme.colors.whiteSmoke[500],
            margin: SIZES.smallMedium,
            marginTop: SIZES.xSmall,
            paddingHorizontal: SIZES.xSmall
        }
    });

    return (
        <SafeAreaView style={styles.inputContainer}>
            <TextInput
                style={{ flex: 1, color: theme.colors.white[500] }}
                name={name}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                error={error}
                underlineColor={underlineColor}
                activeUnderlineColor={activeUnderlineColor}
            />
            <HelperText type="error" visible={helperText}>
                See what happens
            </HelperText>
        </SafeAreaView>
    );
};

CustomInputBox.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.object,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.bool,
    underlineColor: PropTypes.object,
    activeUnderlineColor: PropTypes.object
};

export default CustomInputBox;
