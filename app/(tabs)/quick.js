/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

const QuickPage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> This is the Tab Layout ProductPage </Text>
            <Link href="/" style={styles.text}> Click here to go to main HomeScreen</Link>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "lavender"
    },
    text: {
        fontSize: 20,
        color: "maroon"
    }
});

export default QuickPage;
