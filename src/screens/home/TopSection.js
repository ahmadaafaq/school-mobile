/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { SIZES, FONT } from "../../assets/constants";
import { Utility } from '../../utility';
import { useRouter } from 'expo-router';

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const TopSection = ({ schoolName, title, bg, imageSource, rollno, classes, subjects }) => {
    const theme = useTheme();
    const { setAsyncStorage } = Utility();
    const router = useRouter();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT / 4.5,
            padding: 10,
            backgroundColor: bg,
            borderRadius: 0,
            marginBottom: 60,
            overflow: 'hidden',
            elevation: 10,
        },
        titleStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.bold,
            fontSize: 25,
            fontWeight: 500,
            // marginBottom: 30
        },
        contentStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.medium,
            fontSize: SIZES.smallMedium,
            marginBottom: 4
        },
        btnStyle: {
            color: theme.colors.whiteSmoke[300],
            fontFamily: FONT.Image,
            fontSize: SIZES.large,
            marginBottom: 6
        },
        imageStyle: {
            width: 80,
            height: 80,
            position: 'absolute',
            bottom: 0,
        },
        viewStyle: {
            height: 80,
            width: 80,
            borderRadius: 100,
            overflow: 'hidden',
            marginLeft: 50
        },
        textStyle: {
            position: 'absolute',
            left: 20
        },
        headStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.bold,
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 2,
            marginLeft: 50,
        }
    });

    return (
        <Card
            mode=''
            style={styles.container}
        >
            <View>
                <Text style={styles.headStyle}>{schoolName}</Text>
                <View style={{ width: WINDOW_WIDTH - 60, height: 1, backgroundColor: theme.colors.whiteSmoke[500], margin: 20, marginTop: 5 }}></View>
            </View>
            <View>
                <View style={styles.textStyle}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <View style={{ flex: 1, height: 2, backgroundColor: theme.colors.whiteSmoke[500], marginBottom: 10 }}></View>
                    <Text style={styles.contentStyle}>{classes}</Text>
                    <Text style={styles.contentStyle}>{subjects}</Text>
                </View>
            </View>
            <Button color="error" variant="contained" onPress={() => {
                setAsyncStorage('auth', null)
                router.push("/");
                }}>
                <Text style={styles.btnStyle}>Logout</Text>
            </Button>
        </Card >
    );
};

TopSection.propTypes = {
    title: PropTypes.string,
    content: PropTypes.number,
    growth: PropTypes.string,
    bg: PropTypes.string,
    mr: PropTypes.number,
    ml: PropTypes.number
};

export default TopSection;
