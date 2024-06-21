/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { useCallback, useEffect, useMemo } from 'react';
import { Dimensions, View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONT, SIZES } from '../../assets/constants';

const WINDOW_HEIGHT = Dimensions.get("window").height;

const CustomModal = ({
    children, heightNumber, headerText,
    showModal, setShowModal = null
}) => {
    const translateY = useMemo(() => new Animated.Value(150), []);

    const animatedStyle = {
        transform: [{ translateY }]
    };

    const showContainer = useCallback(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 200,         // Adjust the duration for a faster/slower animation
            easing: Easing.elastic(),
            useNativeDriver: true
        }).start();
    }, [translateY]);

    const hideContainer = useCallback(() => {
        Animated.timing(translateY, {
            toValue: 500,    // Adjust the value to move off-screen
            duration: 300,
            easing: Easing.in(Easing.exp),
            useNativeDriver: true
        }).start(() => setShowModal(false));
    }, [translateY, setShowModal]);

    useEffect(() => {
        if (showModal) {
            showContainer();
        } else {
            hideContainer();
        }
    }, [showModal, showContainer, hideContainer]);

    console.log(heightNumber)

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        subContainer1: {
            height: WINDOW_HEIGHT / heightNumber
        },
        iconContainer: {
            backgroundColor: COLORS.black[600],
            left: '45%',
            bottom: '20%',
            textAlign: 'center',
            borderRadius: 20,
            height: 38,
            width: 38,
            paddingVertical: 5,
            paddingHorizontal: 6.5
        },
        subContainer2: {
            backgroundColor: COLORS.whiteSnow,
            height: WINDOW_HEIGHT / 1,
            padding: 20,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
        },
        headerText: {
            color: COLORS.tealBlue,
            fontSize: SIZES.mediumLarge,
            letterSpacing: 0.2,
            paddingHorizontal: 10,
            marginBottom: 20,
            fontWeight: '700'
        },
        textStyle: {
            color: COLORS.black[600],
            fontFamily: FONT.medium,
            fontWeight: '600',
            fontSize: 13,
            letterSpacing: 0.5,
            lineHeight: 20,
            paddingLeft: 25,
            marginBottom: 10
        }
    });

    return (
        <Animated.View
            style={[styles.container, animatedStyle]}>
            <View style={styles.subContainer1}></View>

            <TouchableOpacity onPress={() => setShowModal(!showModal)}>
                <View style={styles.iconContainer}>
                    <Ionicons name="close-outline" size={26} color={COLORS.whiteSnow} />
                </View>
            </TouchableOpacity>

            <View style={styles.subContainer2}>
                {headerText ? <Text style={styles.headerText}>{headerText}</Text>
                    : null}
                {children}
            </View>
        </Animated.View>
    );
};

CustomModal.propTypes = {
    children: PropTypes.any,
    heightNumber: PropTypes.number,
    headerText: PropTypes.string,
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
};

export default CustomModal;
