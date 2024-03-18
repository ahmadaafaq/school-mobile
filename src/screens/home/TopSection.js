/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import { Dimensions, StyleSheet, Image, View } from 'react-native';
import { Card, Divider, Text, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';

import { SIZES, FONT } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const TopSection = ({ title, content, bg, imageSource, rollno, teacherName }) => {
    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "flex-start",
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
            left: 150
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
                <Text style={styles.headStyle}>ST FRANCES CONVENT SCHOOL</Text>
                <View style={{ width: 200, height: 1, backgroundColor: theme.colors.whiteSmoke[500], marginBottom: 30, marginLeft: 100 }}></View>
            </View>
            <View>
                <View style={styles.viewStyle}>
                    <Image source={imageSource} style={styles.imageStyle} />
                </View>
                <View style={styles.textStyle}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <View style={{ flex: 1, height: 2, backgroundColor: theme.colors.whiteSmoke[500], marginBottom: 10 }}></View>
                    <Text style={styles.contentStyle}>Class {content}  |  Roll No : {rollno}</Text>
                    <Text style={styles.contentStyle}>Class Teacher - {teacherName}</Text>
                </View>
            </View>
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
