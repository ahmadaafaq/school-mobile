/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { useEffect, useRef } from 'react';
import { View, Modal, Animated, Easing, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const CustomActivityIndicator = () => {
    const theme = useTheme();
    const lowestScale = 0.4;
    const scaleAnim = useRef(new Animated.Value(lowestScale)).current;

    const styles = StyleSheet.create({
        indicatorBox: {
            width: 70,
            height: 70,
            justifyContent: 'center',
            alignItems: 'center'
        },
        indicator: {
            backgroundColor: theme.colors.yaleBlue[400],
            width: 40,
            height: 40,
            borderRadius: 100
        }
    });

    useEffect(() => {
        const animationLoop = Animated.loop(
            Animated.sequence([
                Animated.timing(
                    scaleAnim,
                    {
                        toValue: 1,
                        duration: 800,
                        easing: Easing.elastic(),
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    scaleAnim,
                    {
                        toValue: lowestScale,
                        duration: 800,
                        easing: Easing.back(),
                        useNativeDriver: true
                    }
                )
            ])
        );
        animationLoop.start();

        return () => {
            animationLoop.stop();
        };
    }, [scaleAnim]);

    return (
        <View style={styles.indicatorBox}>
            <Animated.View
                style={{ ...styles.indicator, scaleX: scaleAnim, scaleY: scaleAnim }}>
            </Animated.View>
        </View>
    );
};

const LoadingAnimationModal = () => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        indicatorWrapper: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.whiteSnow[400],
            opacity: 0.97
        }
    });

    return (
        <Modal transparent={true}>
            <View style={styles.indicatorWrapper}>
                <CustomActivityIndicator />
            </View>
        </Modal>
    );
};

export default LoadingAnimationModal;
