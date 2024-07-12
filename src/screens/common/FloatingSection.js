/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { icons, SIZES } from "../../assets/constants";

const FloatingSection = ({
    headerText,
    rotateIcon,
    setRotateIcon,
    showModal,
    setShowModal
}) => {
    const theme = useTheme();

    const toggleModal = () => {
        setShowModal(!showModal);
        setRotateIcon(!rotateIcon);
    };

    const handleButtonPress = () => {
        console.log(`${headerText} pressed`);
    };

    const styles = StyleSheet.create({
        floatingSection: {
            backgroundColor: theme.colors.whiteSnow[500],
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
            color: theme.colors.moonstoneBlue[500]
        },
        leftTextStyle: {
            fontSize: 12,
            letterSpacing: 0.5,
            marginTop: 4,
            fontWeight: '600',
            color: theme.colors.black[700]
        },
        buttonStyle: {
            backgroundColor: theme.colors.spanishPink[500],
            padding: 18,
            paddingHorizontal: 40,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonTextStyle: {
            color: theme.colors.whiteSnow[500],
            fontWeight: '600',
            fontSize: 12,
            letterSpacing: 0.5
        },
        rightIconStyle: {
            height: SIZES.xSmall,
            width: SIZES.xSmall,
            tintColor: theme.colors.whiteSnow[500]
        }
    });

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

FloatingSection.propTypes = {
    headerText: PropTypes.string,
    rotateIcon: PropTypes.bool,
    setRotateIcon: PropTypes.func,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func
};

export default FloatingSection;
