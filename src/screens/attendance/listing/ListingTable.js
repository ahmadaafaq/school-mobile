/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { MD2Colors, MD3Colors, Switch } from 'react-native-paper';

import { FONT, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const ListingTable = ({ handleAttendanceChange, item, index, theme }) => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isPresent, setIsPresent] = useState(false);

    // Safely extract properties with defaults
    const className = item?.className || 'Unknown';
    const image_src = item?.image_src || null;
    const studentName = item?.studentName || 'Unknown Student';

    // Initialize attendance state when component mounts
    useEffect(() => {
        if (item.attendance === 'present') {
            setIsSwitchOn(true);
            setIsPresent(true);
        }
    }, [item.attendance]);

    const onToggleSwitch = () => {
        const newStatus = !isSwitchOn ? 'present' : 'absent';
        setIsSwitchOn(!isSwitchOn);
        setIsPresent(!isPresent);
        handleAttendanceChange(index, newStatus);
    };

    const CameraPreview = ({ photo }) => {
        return (
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={{ uri: photo }}
                    style={styles.imageBackground}
                    resizeMode="cover"
                />
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderRadius: 12,
            marginVertical: 8,
            padding: 15,
            backgroundColor: isPresent ? MD2Colors.blue100 : MD2Colors.grey200,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
        },
        imageSection: {
            width: '30%',
            alignItems: 'center',
            justifyContent: 'center',
        },
        imageContainer: {
            height: 80,
            width: 80,
            borderRadius: 40,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: isPresent ? theme.colors.blue[500] : MD2Colors.grey400,
        },
        imageBackground: {
            height: '100%',
            width: '100%',
        },
        noImageContainer: {
            height: 80,
            width: 80,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: MD2Colors.grey300,
            borderWidth: 2,
            borderColor: MD2Colors.grey400,
        },
        noImageText: {
            fontSize: 12,
            color: MD2Colors.grey800,
            textAlign: 'center',
            fontFamily: FONT.medium,
        },
        infoSection: {
            width: '70%',
            paddingLeft: 10,
        },
        infoRow: {
            flexDirection: 'row',
            marginBottom: 8,
            alignItems: 'center',
        },
        labelText: {
            color: theme.colors.blue[700],
            fontFamily: FONT.medium,
            fontSize: SIZES.medium,
            marginRight: 5,
        },
        valueText: {
            color: theme.colors.black[600],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            textTransform: 'capitalize',
            flex: 1,
        },
        statusContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 5,
        },
        statusText: {
            color: isPresent ? theme.colors.green[700] : theme.colors.red[700],
            fontFamily: FONT.medium,
            fontSize: SIZES.medium,
            marginRight: 10,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.imageSection}>
                {image_src ? (
                    <CameraPreview photo={image_src} />
                ) : (
                    <View style={styles.noImageContainer}>
                        <Text style={styles.noImageText}>No Image</Text>
                    </View>
                )}
            </View>
            
            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Name:</Text>
                    <Text style={styles.valueText} numberOfLines={1}>{studentName}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.labelText}>Class:</Text>
                    <Text style={styles.valueText} numberOfLines={1}>{className}</Text>
                </View>
                
                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                        {isPresent ? 'Present' : 'Absent'}
                    </Text>
                    <Switch
                        value={isSwitchOn}
                        onValueChange={onToggleSwitch}
                        color={theme.colors.blue[500]}
                    />
                </View>
            </View>
        </View>
    );
};

ListingTable.propTypes = {
    handleAttendanceChange: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    theme: PropTypes.object.isRequired,
};

export default ListingTable;