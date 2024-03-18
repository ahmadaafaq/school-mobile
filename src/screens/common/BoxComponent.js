/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { FONT } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const BoxComponent = ({ title, bg, mb, iconName, handlePress = null }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            width: WINDOW_WIDTH / 5.5,
            height: WINDOW_HEIGHT / 9.5,
            marginBottom: mb,
            padding: 20,
            backgroundColor: bg,
            borderRadius: 20
        },
        element: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        titleStyle: {
            color: theme.colors.whiteSmoke[900],
            fontFamily: FONT.bold,
            fontSize: 13,
            fontWeight: 400,
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
                <View><MaterialIcons name={iconName} size={35} color={theme.colors.whiteSmoke[100]} /></View>
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
