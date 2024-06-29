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
import { useEffect } from 'react';

export const MultipleDropdown = ({ data, placeholder, setSelected }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        boxStyles: {
            borderWidth: 0,
            borderRadius: 4,
            width: "90%",
            margin: SIZES.smallMedium,
            backgroundColor: theme.colors.whiteSmoke[500],
        },
        dropdownStyles: {
            width: "90%",
            borderColor: theme.colors.whiteSmoke[500],
            borderRadius: 8,
            marginTop: -10,
            marginLeft: 16,
        },
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
            />
        </SafeAreaView>
    );
};

const CustomDropdown = ({
    bg,
    data,
    placeholder,
    selected,
    setSelected,
    width = 'auto',
    height = 'auto',
}) => {
    const theme = useTheme();

    const handleSelection = (value) => {
        console.log(value, 'dropdown value');
        setSelected(value.toLowerCase());
    };

    useEffect(() => {
        if (selected) {
            handleSelection(selected);
        }
    }, [selected]);

    const styles = StyleSheet.create({
        boxStyles: {
            width: width,
            height: height,
            borderWidth: 0,
            borderRadius: 0,
            backgroundColor: bg,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 10
        },
        dropdownStyles: {
            width: width,
            borderWidth: 0,
            borderBottomWidth: 1,
            borderRadius: 0,
            marginTop: 0,
            marginLeft: 0,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            elevation: 10,
            backgroundColor:"white"
        },
    });

    return (
        <SelectList
            setSelected={(val) => handleSelection(val)}
            data={data}
            save="value"
            placeholder={placeholder}
            placeholderTextColor={theme.colors.whiteSmoke[400]}
            fontFamily={FONT.regular}
            boxStyles={styles.boxStyles}
            inputStyles={{ color: theme.colors.whiteSmoke[900], fontFamily: FONT.medium }}
            dropdownStyles={styles.dropdownStyles}
            dropdownItemStyles={{ backgroundColor: theme.colors.whiteSmoke[100] }}
            dropdownTextStyles={{
                color: theme.colors.white[800],
                textAlign: 'center',
                fontFamily: FONT.medium,
            }}
            defaultOption={{ key: '1', value: `${selected.charAt(0).toUpperCase() + selected.slice(1)}` }}
        />
    );
};

MultipleDropdown.propTypes = {
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
};

CustomDropdown.propTypes = {
    bg: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    setSelected: PropTypes.func.isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default CustomDropdown;
