/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { View, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from './search.style';
import { COLORS, icons } from "../../assets/constants";

const SearchContainer = () => {
    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchBtn}>
                <Image
                    source={icons.search}
                    resizeMode='contain'
                    style={styles.searchBtnImage}
                />
            </TouchableOpacity>
            <TextInput style={styles.searchInput} placeholder='Search..' placeholderTextColor={COLORS.white[700]} />
        </View>
    )
};

export default SearchContainer;
