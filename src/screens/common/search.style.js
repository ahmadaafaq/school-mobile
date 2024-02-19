/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions, StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../assets/constants";

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        marginLeft: 30,
        marginBottom: 20,
        marginTop: 10,
        height: 40,
        width: SCREEN_WIDTH - 60,
        backgroundColor: COLORS.lightBlue,
        borderRadius: SIZES.large
    },
    searchInput: {
        width: "100%",
        height: "100%",
        color: COLORS.yaleBlue,
        fontFamily: FONT.regular,
        paddingHorizontal: SIZES.medium
    },
    searchBtn: {
        width: 50,
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    searchBtnImage: {
        tintColor: COLORS.yaleBlue,
        width: "60%",
        height: "60%"
    }
});

export default styles;
