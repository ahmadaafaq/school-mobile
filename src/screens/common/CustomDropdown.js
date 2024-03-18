/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import PropTypes from 'prop-types';

import { FONT, SIZES } from '../../theme/theme';

export const MultipleDropdown = ({ data, placeholder, setSelected }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        boxStyles: {
            borderWidth: 0,
            borderRadius: 4,
            width: "92%",
            margin: SIZES.smallMedium,
            backgroundColor: theme.colors.whiteSmoke[500]
        },
        dropdownStyles: {
            width: "92%",
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderColor: theme.colors.whiteSmoke[500],
            borderRadius: 8,
            marginTop: -10,
            marginLeft: 16
        }
    });

    return (
        <SafeAreaView>
            <MultipleSelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder={placeholder}
                placeholderTextColor={theme.colors.whiteSmoke[400]}
                fontFamily={FONT.regular}
                boxStyles={styles.boxStyles}
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={{ backgroundColor: theme.colors.whiteSmoke[500] }}
                inputStyles={{ color: theme.colors.whiteSmoke[700] }}
            // badgeStyles={{
            //     backgroundColor: theme.colors.blackish[400]
            // }}
            // checkBoxStyles={{
            //     backgroundColor: theme.colors.blue[400]
            // }}
            />
        </SafeAreaView>
    );
};

const CustomDropdown = ({ data, placeholder, setSelected, width }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        boxStyles: {
            borderWidth: 0,
            borderRadius: 4,
            width: width,
            margin: SIZES.smallMedium,
            backgroundColor: theme.colors.whiteSmoke[500]
        },
        dropdownStyles: {
            width: width,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderRadius: 8,
            marginTop: -10,
            marginLeft: 16,
            borderColor: theme.colors.whiteSmoke[500]
        }
    });

    return (
        <SafeAreaView>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder={placeholder}
                placeholderTextColor={theme.colors.whiteSmoke[400]}
                fontFamily={FONT.regular}
                boxStyles={styles.boxStyles}
                dropdownStyles={styles.dropdownStyles}
                dropdownItemStyles={{ backgroundColor: theme.colors.whiteSmoke[500] }}
                inputStyles={{ color: theme.colors.whiteSmoke[700] }}
            // dropdownTextStyles={{
            // color: theme.colors.white[600]
            // }}
            />
        </SafeAreaView>
    );
};

MultipleDropdown.propTypes = {
    data: PropTypes.array,
    placeholder: PropTypes.string,
    setSelected: PropTypes.func
};

CustomDropdown.propTypes = {
    data: PropTypes.array,
    placeholder: PropTypes.string,
    setSelected: PropTypes.func,
    width: PropTypes.string
};

export default CustomDropdown;
