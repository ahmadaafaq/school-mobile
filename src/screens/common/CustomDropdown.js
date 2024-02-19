/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SelectList } from 'react-native-dropdown-select-list';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

import { ALIGNMENT, FONT, SIZES } from '../../theme/theme';


export const MultipleDropdown = ({ data, placeholder, selected, setSelected }) => {
    const theme = useTheme();

    return (
        <SafeAreaView>
            <MultipleSelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder={placeholder}
                placeholderTextColor={theme.colors.white[400]}
                fontFamily={FONT.regular}
                boxStyles={{
                    borderWidth: 0, borderRadius: 4, width: "92%", margin: SIZES.smallMedium, backgroundColor: theme.colors.white[500]
                }}
                dropdownStyles={{
                    width: "92%", borderTopWidth: 0, borderBottomWidth: 0, borderRadius: 8, marginTop: -10, marginLeft: 16, borderColor: theme.colors.white[500]
                }}
                dropdownItemStyles={{
                    backgroundColor: theme.colors.white[500]
                }}
                inputStyles={{ color: theme.colors.white[700] }}
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

const CustomDropdown = ({ data, placeholder, selected, setSelected }) => {
    const theme = useTheme();

    return (
        <SafeAreaView>
            <SelectList
                setSelected={(val) => setSelected(val)}
                data={data}
                save="value"
                placeholder={placeholder}
                placeholderTextColor={theme.colors.white[400]}
                fontFamily={FONT.regular}
                boxStyles={{
                    borderWidth: 0, borderRadius: 4, width: "92%", margin: SIZES.smallMedium, backgroundColor: theme.colors.white[500]
                }}
                dropdownStyles={{
                    width: "92%", borderTopWidth: 0, borderBottomWidth: 0, borderRadius: 8, marginTop: -10, marginLeft: 16, borderColor: theme.colors.white[500]
                }}
                dropdownItemStyles={{
                    backgroundColor: theme.colors.white[500]
                }}
                inputStyles={{ color: theme.colors.white[700] }}
            // dropdownTextStyles={{
            // color: theme.colors.white[600]
            // }}
            />
        </SafeAreaView>
    );
};

export default CustomDropdown;
