/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { FONT } from "../../../assets/constants";

import Box from '../../common/BoxComponent';

const homework = () => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        boxContainer: {
            flexDirection: 'row',
            marginVertical: 10
        },
        textStyle:{
            margin:20,
            color: theme.colors.whiteSmoke[900],
            fontFamily: FONT.bold,
            fontSize: 18,
            letterSpacing: 0.12, 
        }
    });


    return (
        <View>
            <Text style={styles.textStyle}>Subjects</Text>
            <View style={styles.boxContainer}>
                <Box title='English' bg={theme.colors.grayishGreen[500]} mb={10} mt={30} iconName="sort-by-alpha" />
                <Box title='Hindi' bg={theme.colors.grayishRed[500]} mb={10} mt={30} iconName="auto-stories" />
                <Box title='Mathematics' bg={theme.colors.grayishRed[500]} mb={10} mt={30} iconName="calculate" />
            </View>
            <View style={styles.boxContainer}>
                <Box title='Science' bg={theme.colors.grayishYellow[500]} mb={10} mt={30} iconName="science" />
                <Box title='Social Study' bg={theme.colors.blue[500]} mb={10} mt={30} iconName="psychology" />
                <Box title='Computer' bg={theme.colors.blue[500]} mb={10} mt={30} iconName="computer" />
            </View>
            <View style={styles.boxContainer}>
                <Box title='Art' bg={theme.colors.grayishYellow[500]} mb={10} mt={30} iconName="color-lens" />
            </View>
        </View>
    )
}

export default homework