/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons';

import { FONT } from "../../assets/constants";

const BoxComponent = ({ title, bg, mb, iconName, handlePress = null }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 65,
            height: 65,
            marginBottom: mb,
            padding: 10,
            backgroundColor: bg,
            borderRadius: 20
        },
        element: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleStyle: {
            color: theme.colors.white[100],
            fontFamily: FONT.bold,
            fontSize: 14,
            fontWeight: '600',
            letterSpacing: 0.12
        }
    });

    return (
        <TouchableOpacity style={styles.element}
            onPress={() => handlePress()}
        >
            <Card
                mode=''
                style={styles.container}
            >
                <View><FontAwesome5 name={iconName} size={30} color={theme.colors.white[900]} /></View>
            </Card>
            <View><Text style={styles.titleStyle}>{title}</Text></View>
        </TouchableOpacity>
    );
};

BoxComponent.propTypes = {
    title: PropTypes.string,
    bg: PropTypes.string,
    mb: PropTypes.number,
    iconName: PropTypes.string,
    handlePress: PropTypes.func
};

export default BoxComponent;
