/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import { icons, COLORS, SIZES } from "../../assets/constants";

const FloatingSection = ({
    headerText,
    rotateIcon,
    setRotateIcon,
    showModal,
    setShowModal
}) => {

    const router = useRouter();

    const toggleModal = () => {
        setShowModal(!showModal);
        setRotateIcon(!rotateIcon);
    };

    const handleButtonPress = () => {
        console.log(`${headerText} pressed`);
    };

    return (
        <View style={styles.floatingSection}>
            <TouchableOpacity onPress={toggleModal}>
                <View style={styles.subSection1}>
                    <MaterialIcons name="shopping-bag" size={30} style={styles.iconStyle} />
                    <MaterialIcons name="arrow-drop-down" size={22} style={[styles.iconStyle,
                    { marginRight: 0, marginTop: 4, marginLeft: -5, transform: [{ rotate: rotateIcon ? '180deg' : '0deg' }] }
                    ]} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonStyle}
                onPress={handleButtonPress}
            >
                <Text style={styles.buttonTextStyle}>NEXT</Text>
                <Image
                    source={icons.chevronRight}
                    style={styles.rightIconStyle}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    floatingSection: {
        backgroundColor: COLORS.whiteSnow,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(105,105,105,0.1)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    subSection1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconStyle: {
        marginRight: 8,
        color: COLORS.moonstoneBlue
    },
    leftTextStyle: {
        fontSize: 12,
        letterSpacing: 0.5,
        marginTop: 4,
        fontWeight: '600',
        color: COLORS.black[700]
    },
    buttonStyle: {
        backgroundColor: COLORS.primaryColor,
        padding: 18,
        paddingHorizontal: 40,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextStyle: {
        color: COLORS.whiteSnow,
        fontWeight: '600',
        fontSize: 12,
        letterSpacing: 0.5
    },
    rightIconStyle: {
        height: SIZES.xSmall,
        width: SIZES.xSmall,
        tintColor: COLORS.whiteSnow
    }
});

FloatingSection.propTypes = {
    headerText: PropTypes.string,
    rotateIcon: PropTypes.bool,
    setRotateIcon: PropTypes.func,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func
};

export default FloatingSection;
