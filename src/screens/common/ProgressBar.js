/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { ProgressBar, useTheme } from 'react-native-paper';

const CustomProgressBar = ({ progress, color }) => {
    const theme = useTheme();

    const styles = {
        progress: {
            backgroundColor: theme.colors.grayishWhite[600],
            borderRadius: 8,
            marginLeft: 2
        }
    };

    return (
        <ProgressBar progress={progress} color={color} style={styles.progress} />
    );
};

export default CustomProgressBar;
