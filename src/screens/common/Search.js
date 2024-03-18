/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import styles from './search.style';
import { icons } from "../../assets/constants";

const SearchContainer = ({ searchTerm = null, setSearchTerm = null }) => {
    const theme = useTheme();

    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBtn}>
                <Image
                    source={icons.search}
                    resizeMode='contain'
                    style={styles.searchBtnImage}
                />
            </TouchableOpacity>
            <TextInput
                style={styles.searchInput}
                placeholder='Search..'
                placeholderTextColor={theme.colors.whiteSmoke[500]}
                value={searchTerm}
                onChangeText={value => setSearchTerm(value)}
            />
        </View>
    );
};

SearchContainer.propTypes = {
    searchTerm: PropTypes.string,
    setSearchTerm: PropTypes.func
};

export default SearchContainer;
