/* eslint-disable react/react-in-jsx-scope */
/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
*/

import PropTypes from 'prop-types';

import { Dimensions, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Card, PaperProvider, IconButton, Text, useTheme, Button } from 'react-native-paper';

import { FONT } from "../../assets/constants";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = Dimensions.get("window").height;

const TopSection = ({
    schoolName,
    title,
    classes,
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
            height: WINDOW_HEIGHT / 3.5,
            padding: 10,
            backgroundColor: bg,
            borderRadius: 0,
            marginBottom: 60,
            overflow: 'hidden',
            borderBottomStartRadius: 20,
            borderBottomEndRadius: 20
        },
        titleStyle: {
            color: theme.colors.white[500],
            fontFamily: FONT.bold,
            fontSize: 18,
            fontWeight: 500
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
            overflow: 'hidden'
        },
        headStyle: {
            color: theme.colors.white[500],
            fontFamily: FONT.bold,
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 2,
            textAlign: 'center',
            marginTop: -15
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
                        width: WINDOW_WIDTH - 60,
                        height: 1,
                        backgroundColor: theme.colors.white[500],
                        margin: 20,
                        marginTop: 5,
                        marginBottom: 10
                    }}></View>
                </View>

                <View style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    width: WINDOW_WIDTH - 40,
                }}>
                    <View style={{
                        alignItems: 'center',
                        borderColor: theme.colors.indigo[500],
                        borderRadius: 8,
                        borderWidth: 4,
                        justifyContent: 'space-between',
                        flexGrow: 0.4,
                        height: 120,
                        marginHorizontal: 20,
                        overflow: 'hidden',
                        width: '35%',
                    }}>
                        {!image ? (
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <IconButton
                                    icon="plus-circle"
                                    size={50}
                                />
                            </TouchableOpacity>
                        ) : (
                            <>
                                <Image
                                    source={{ uri: image }}
                                    style={{
                                        flex: 1,
                                        objectFit: "fill",
                                        width: "100%"
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
                                            backgroundColor: theme.colors.white[900]
                                        }}
                                    />}
                            </>
                        )}
                    </View>
                    <View style={{
                        flexGrow: 0.6,
                        width: '50%'
                    }}>
                        <Text style={styles.titleStyle}>{title}</Text>
                        <Text style={styles.titleStyle}>Class  : {classes} </Text>
                    </View>
                    {multiple &&
                        <Button
                            mode='contained'
                            buttonColor={theme.colors.blue[400]}
                            theme={{ colors: { primary: theme.colors.white[900] } }}
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
    setVisible: PropTypes.func,
    title: PropTypes.string,
    userRole: PropTypes.string
};

export default TopSection;
