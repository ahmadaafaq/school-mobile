/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { useState } from 'react';

import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { MD2Colors, MD3Colors, Switch } from 'react-native-paper';

import { FONT, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

export const ListingTable = ({ handleAttendanceChange, item, index, theme }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isPresent, setIsPresent] = useState(false);

    const { className, image_src, studentName } = item;

    const onToggleSwitch = () => {
        const newStatus = !isSwitchOn ? 'present' : 'absent';
        setIsSwitchOn(!isSwitchOn);
        setIsPresent(prevState => !prevState);
        handleAttendanceChange(index, newStatus);
    };

    const styles = StyleSheet.create({
        plusBox: {
            height: WINDOW_HEIGHT / 5,
            width: WINDOW_WIDTH - 250,
            borderRadius: 5,
            backgroundColor: MD3Colors.secondary20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            margin: 7
        },
        plusButton: {
            width: 80,
            height: 50,
            borderRadius: 18,
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
        },
        camera: {
            flex: 1,
            position: 'relative',
            zIndex: 5,
            height: WINDOW_HEIGHT / 1.2,
            width: WINDOW_WIDTH
        },
        titleLabelText: {
            color: theme.colors.black[600],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            textTransform: 'capitalize'
        },
        titleText: {
            color: theme.colors.blue[700],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: 'bold',
            textTransform: 'capitalize'
        },
        icon: {
            color: theme.colors.white[500]
        }
    });

    const CameraPreview = ({ photo }) => {
        return (
            <View
                style={{
                    flex: 1,
                    width: '96%'
                }}
            >
                <ImageBackground
                    source={{ uri: photo && photo }}
                    style={{
                        flex: 1,
                        marginTop: 2,
                        height: '98%'
                    }}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={{
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'space-between',
            // height: WINDOW_HEIGHT / 5.5,
            width: WINDOW_WIDTH - 25,
            // borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 5,
            margin: 10,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            backgroundColor: MD2Colors.blue400,
        }}>
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                <View style={styles.plusBox}>
                    {image_src ? (
                        <CameraPreview photo={image_src} />
                    ) : (
                        <TouchableOpacity style={styles.plusButton}>
                            <Text> No Image </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
            <View style={{
                width: '50%', borderRadius: 5,
            }}>
                <Text style={styles.titleText}>Name:</Text><Text style={styles.titleLabelText}>{studentName}</Text>
                <Text style={styles.titleText}> Class:</Text><Text style={styles.titleLabelText}>{className}</Text>
                <View style={{
                    width: '45%', flexDirection: 'row'
                }}>
                    <Text style={styles.titleText}> {isPresent ? 'Present' : 'Absent'}: </Text>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </View>
            </View>
        </SafeAreaView>
    );
};

ListingTable.propTypes = {
    handleAttendanceChange: PropTypes.func,
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object,
    photo: PropTypes.any,
};

export default ListingTable;
