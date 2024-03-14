/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from "prop-types";

import { Dimensions, View, StyleSheet, Text } from "react-native";
import { Snackbar } from 'react-native-paper';

import { FONT } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;

const Toast = ({
    alerting,
    message,
    backgroundColor,
    textColor
}) => {

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: WINDOW_WIDTH / 1.13
        },
        messageStyle: {
            fontFamily: FONT.bold,
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0.12
        }
    });

    return (
        <View
            style={[styles.container]}
        >
            <Snackbar
                visible={alerting}
                style={{ backgroundColor: backgroundColor }}
            >
                <Text
                    style={[styles.messageStyle, { color: textColor }]}>{message}
                </Text>
            </Snackbar>
        </View>
    );
};

Toast.propTypes = {
    alerting: PropTypes.bool,
    message: PropTypes.string,
    backgroundColor: PropTypes.string,
    textColor: PropTypes.string
};

export default Toast;
