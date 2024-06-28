/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { SafeAreaView, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';

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

const CustomDropdown = ({
    bg,
    data,
    placeholder,
    setSelected,
    search,
    width = 'auto',
    height = 'auto'
}) => {
    const theme = useTheme();

    const handleSelection = (value) => {
        console.log(value, 'dropdown value');
        setSelected(value.toLowerCase());
    };

    const styles = StyleSheet.create({
        boxStyles: {
            width: width,
            height: height,
            borderWidth: 0,
            borderRadius: 0,
            backgroundColor: bg
        },
        dropdownStyles: {
            width: width,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            marginTop: -8,
            marginLeft: 1
            // borderColor: theme.colors.whiteSmoke[500]
        }
    });

    return (
        <SelectList
            setSelected={(val) => handleSelection(val)}
            data={data}
            save="value"
            search={search}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.whiteSmoke[400]}
            fontFamily={FONT.regular}
            boxStyles={styles.boxStyles}
            inputStyles={{ color: theme.colors.whiteSmoke[700], fontFamily: FONT.medium }}
            dropdownStyles={styles.dropdownStyles}
            dropdownItemStyles={{ backgroundColor: theme.colors.whiteSmoke[500] }}
            dropdownTextStyles={{
                color: theme.colors.white[700],
                textAlign: 'center',
                fontFamily: FONT.medium
            }}
        />
    );
};

MultipleDropdown.propTypes = {
    data: PropTypes.array,
    placeholder: PropTypes.string,
    setSelected: PropTypes.func
};

CustomDropdown.propTypes = {
    bg: PropTypes.string,
    data: PropTypes.array,
    placeholder: PropTypes.string,
    setSelected: PropTypes.func,
    search: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default CustomDropdown;
