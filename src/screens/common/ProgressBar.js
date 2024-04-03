/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { StyleSheet } from 'react-native';
import { ProgressBar, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

const CustomProgressBar = ({ progress, color }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        progress: {
            backgroundColor: theme.colors.grayishWhite[600],
            borderRadius: 8,
            marginLeft: 2
        }
    });

    return (
        <ProgressBar progress={progress} color={color} style={styles.progress} />
    );
};

CustomProgressBar.propTypes = {
    progress: PropTypes.number,
    color: PropTypes.string,
};

export default CustomProgressBar;
