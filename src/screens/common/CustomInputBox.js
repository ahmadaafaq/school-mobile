/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { HelperText, useTheme, TextInput, Divider } from 'react-native-paper';

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
            height: name !== "description" ? 50 : 150,
            flexDirection: ALIGNMENT.rowDirection,
            alignItems: ALIGNMENT.centered,
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
                style={{ flex: 1, height: name !== "description" ? 50 : 150, color: theme.colors.white[500] }}
                name={name}
                multiline={name === 'description'}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                error={error}
                underlineColor={underlineColor}
                activeUnderlineColor={activeUnderlineColor}
            />
            <View>
                <Text style={{ color: 'red' }}>
                    {helperText}
                </Text>
            </View>
        </SafeAreaView>
    );
};

CustomInputBox.propTypes = {
    name: PropTypes.string,
    placeholder: PropTypes.string,
    placeholderTextColor: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onBlur: PropTypes.func,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    underlineColor: PropTypes.string,
    activeUnderlineColor: PropTypes.string
};

export default CustomInputBox;
