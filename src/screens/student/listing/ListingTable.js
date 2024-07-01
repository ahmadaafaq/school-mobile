/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { ActivityIndicator, IconButton, MD2Colors, MD3Colors } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";

import API from "../../../apis";
import { FONT, SIZES } from "../../../assets/constants";
import { Utility } from "../../../utility";
import { useLocalSearchParams } from 'expo-router';

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    plusBox: {
        height: 80,
        width: 80,
        borderRadius: 200,
        backgroundColor: MD3Colors.secondary20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        margin: 0,
        overflow: "hidden"
    },
    plusButton: {
        width: 40,
        height: 40,
        borderRadius: 30,
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
    cameraButtonContainer: {
        flex: 1,
        width: '90%',
        height: 500,
        backgroundColor: 'transparent',
        // flexDirection: 'row',
        margin: 20,
    },
    // titleLabelText: {
    //     color: theme.colors.black[600],
    //     fontFamily: FONT.regular,
    //     fontSize: SIZES.medium,
    //     // paddingTop: SIZES.small,
    //     // paddingLeft: SIZES.xSmall,
    //     letterSpacing: 0.22,
    //     textTransform: 'capitalize'
    // },
    // titleText: {
    //     color: theme.colors.blue[700],
    //     fontFamily: FONT.regular,
    //     fontSize: SIZES.medium,
    //     // paddingTop: SIZES.small,
    //     // paddingLeft: SIZES.xSmall,
    //     // letterSpacing: 0.22,
    //     fontWeight: "700",
    //     textTransform: 'capitalize'
    // },
    detailBtn: {
        borderWidth: 1,
        top: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: '25%',
        height: 40,
        borderRadius: 4,
        // backgroundColor: theme.colors.green[500],
        marginBottom: 10,
        zIndex: 1
    },
    detailText: {
        // color: theme.colors.white[500],
        fontFamily: FONT.regular,
        fontSize: 15,
        letterSpacing: 0.12,
        fontWeight: '400'
    },
    fab: {
        height: 60,
        backgroundColor: "white",
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        top: 20,
    },
    // icon: {
    //     color: theme.colors.white[500]
    // },
});

const styles2 = StyleSheet.create({
    container: {
        width: '150%',
        // borderRadius: 5,
        // padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    titleText: {
        // color: theme.colors.blue[700],
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        // paddingTop: SIZES.small,
        // paddingLeft: SIZES.xSmall,
        // letterSpacing: 0.22,
        fontWeight: "700",
        textTransform: 'capitalize'
    },
    titleLabelText: {
        flex: 1,
        // color: theme.colors.black[600],
        fontFamily: FONT.regular,
        fontSize: SIZES.medium,
        // letterSpacing: 0.22,
        textTransform: 'capitalize'
    },
});

export const ListingTable = ({ item, theme }) => {
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [uploading, setUploading] = useState(false);

    const { uploadImg } = Utility();
    const params = useLocalSearchParams();

    function normalizeSpacing(name) {
        return name.replace(/\s+/g, ' ').trim();
    }

    useEffect(() => {
        if (item.image_src)
            setPreviewVisible(true);
    }, [item.image_src]);

    // Function to capture an image using the device's camera 
    const pickImageCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            allowsMultipleSelection: false,
        });
        if (!result.canceled) {
            setCapturedImage(result.assets[0].uri);
            setPreviewVisible(true);
        }
    };
    console.log(capturedImage, params.school, 'captured image')


    const CameraPreview = ({ photo }) => {
        return (
            <View
                style={{
                    backgroundColor: 'transparent',
                    flex: 1,
                    width: '100%',
                    height: '100%'
                }}
            >
                <ImageBackground
                    source={{ uri: photo && photo }}
                    style={{
                        flex: 1
                    }}
                />
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            // display: "flex",
            flexDirection: 'row',
            // justifyContent: 'space-around',
            // height: WINDOW_HEIGHT / 5.5,
            gap: 10,
            width: WINDOW_WIDTH - 25,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 5,
            margin: 10,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            backgroundColor: MD2Colors.blue100,
        }}>
            <View style={{ display: 'flex', justifyContent: "center" }}>
                <View style={styles.plusBox}>
                    {(previewVisible && capturedImage) || item.image_src ? (
                        <CameraPreview photo={capturedImage || item?.image_src} />
                    ) : (
                        <TouchableOpacity style={styles.plusButton} onPress={pickImageCamera}>
                            <IconButton
                                icon="plus-circle"
                                iconColor={MD3Colors.error30}
                                size={50}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {previewVisible &&
                    <View style={{ flexDirection: 'row' }}>
                        {!uploading ? (
                            <>
                                <TouchableOpacity onPress={() => {
                                    setCapturedImage(null);
                                    setPreviewVisible(false);
                                    pickImageCamera();
                                }}>
                                    <IconButton
                                        icon="camera"
                                        iconColor={MD3Colors.error30}
                                        size={25}
                                    />
                                    <Text style={{ marginLeft: 5 }}>Retake</Text>
                                </TouchableOpacity>
                                {capturedImage &&
                                    <TouchableOpacity onPress={() => uploadImg(setUploading, capturedImage, 'student', API.CommonAPI, params.school, item)}>
                                        <IconButton
                                            icon="upload"
                                            iconColor={MD3Colors.error30}
                                            size={25}
                                        />
                                        <Text style={{ marginLeft: 5 }}>Upload</Text>
                                    </TouchableOpacity>}
                            </>) : (
                            <ActivityIndicator size={'small'} animating={true} color={MD3Colors.primary100} />
                        )}
                    </View>}
            </View>
            <View style={{
                width: '50%', borderRadius: 5,
            }}>
                <View style={styles2.container}>
                    <View style={styles2.row}>
                        <Text style={styles2.titleText}>Name    : </Text>
                        <Text style={styles2.titleLabelText}>   {normalizeSpacing(item?.studentName)}</Text>
                    </View>
                    <View style={styles2.row}>
                        <Text style={styles2.titleText}>Class   : </Text>
                        <Text style={styles2.titleLabelText}>   {normalizeSpacing(item?.className)}</Text>
                    </View>
                    <View style={styles2.row}>
                        <Text style={styles2.titleText}>Father's Name   :</Text>
                        <Text style={styles2.titleLabelText}>    {normalizeSpacing(item?.father_name)}</Text>
                    </View>
                    {/* Uncomment if needed
            <View style={styles.row}>
                <Text style={styles.titleText}>Gender:</Text>
                <Text style={styles.titleLabelText}>{normalizeSpacing(item?.gender)}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleText}>Blood Group:</Text>
                <Text style={styles.titleLabelText}>{normalizeSpacing(item?.blood_group)}</Text>
            </View>
            */}
                </View>
            </View>
        </SafeAreaView>
    );
};

ListingTable.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object,
    photo: PropTypes.object
};

export default ListingTable;
