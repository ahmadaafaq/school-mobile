/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { Dimensions, StyleSheet, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Card, PaperProvider, IconButton, Text, useTheme, Button } from 'react-native-paper';

import { SIZES, FONT } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const TopSection = ({
    schoolName,
    title,
    classes,
    subjects,
    bg,
    image,
    setVisible,
    userRole,
    multiple,
    setIsMultiple
}) => {

    const theme = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT / 3.4,
            padding: 10,
            backgroundColor: bg,
            borderRadius: 0,
            marginBottom: 60,
            overflow: 'hidden',
            elevation: 10
        },
        titleStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.bold,
            fontSize: WINDOW_HEIGHT / 40,
            fontWeight: 500
        },
        contentStyle: {
            color: theme.colors.whiteSmoke[200],
            fontFamily: FONT.medium,
            fontSize: SIZES.smallMedium
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
        <PaperProvider>
            <Card
                mode=''
                style={styles.container}
            >
                <View>
                    <Text style={styles.headStyle}>{schoolName}</Text>
                    <View style={{
                        width: WINDOW_WIDTH - 60, height: 1, backgroundColor: theme.colors.whiteSmoke[500],
                        margin: 20, marginTop: 5, marginBottom: 10
                    }}></View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: WINDOW_WIDTH - 30,
                    height: 120,
                    marginLeft: 6
                }}>
                    <View style={{
                        flexGrow: 0.4,
                        width: '25%',
                        height: 100,
                        marginLeft: 10,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: theme.colors.blue[300]
                    }}>
                        {!image ? (
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <IconButton
                                    icon="plus-circle"
                                    // iconColor={MD3Colors.error30}
                                    size={50}
                                />
                            </TouchableOpacity>
                        ) : (
                            <>
                                <ImageBackground
                                    source={{ uri: image }}
                                    style={{
                                        flex: 1,
                                        objectFit: "contain",
                                        width: "100%",
                                    }}
                                />
                                {userRole === 'teacher' &&
                                    <IconButton
                                        icon="pencil"
                                        size={15}
                                        onPress={() => setVisible(true)}
                                        style={{
                                            position: "absolute",
                                            right: 1,
                                            top: 1,
                                            backgroundColor: "white"
                                        }}
                                    />}
                            </>
                        )}
                    </View>
                    <View style={{
                        flexGrow: 0.5,
                        width: '50%',
                        top: 10
                    }}>
                        <Text style={styles.titleStyle}>{title}</Text>
                        <Text style={styles.contentStyle}>Classes  : {classes} </Text>
                        {/* <Text style={styles.contentStyle}>Subjects : {subjects}</Text> */}
                    </View>
                    {multiple &&
                        <Button
                            mode='contained'
                            buttonColor={theme.colors.blue[400]}
                            theme={{ colors: { primary: 'white' } }}
                            onPress={() => setIsMultiple(true)}
                            style={{
                                marginTop: 40,
                                marginLeft: WINDOW_WIDTH - 280
                            }}
                        >
                            All Children
                        </Button>
                    }
                </View>
            </Card>

        </PaperProvider>
    );
};

TopSection.propTypes = {
    bg: PropTypes.string,
    classes: PropTypes.string,
    image: PropTypes.string,
    multiple: PropTypes.bool,
    schoolName: PropTypes.string,
    setIsMultiple: PropTypes.func,
    subjects: PropTypes.string,
    setVisible: PropTypes.func,
    userRole: PropTypes.string,
    title: PropTypes.string
};

export default TopSection;
