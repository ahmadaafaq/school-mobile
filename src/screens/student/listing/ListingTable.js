/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';
import * as ImageManipulator from 'expo-image-manipulator';

import { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from 'expo-camera';
import { S3_PATHNAME } from '@env';
import { ActivityIndicator, FAB, IconButton, MD2Colors, MD3Colors } from 'react-native-paper';

import API from "../../../apis";
import { FONT, SIZES } from "../../../assets/constants";
import { Utility } from "../../../utility";
import { useLocalSearchParams } from 'expo-router';

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

export const ListingTable = ({ item, flatListRef, index, theme }) => {
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const cameraRef = useRef(null);
    const { formatImageName, uploadFileToS3 } = Utility();
    const params = useLocalSearchParams();

    useEffect(() => {
        if (item.image_src)
            setPreviewVisible(true);
    }, [item.image_src]);

    const handleOpenCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setCameraVisible(true);
            flatListRef.current.scrollTo({ x: 0, y: WINDOW_HEIGHT * index, animated: true })
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
        }
    };

    const clickPhoto = async () => {
        setLoading(true);
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            setLoading(false);
            setCameraVisible(false);
            setCapturedImage(photo);
            setPreviewVisible(true);
        }
    };

    const uploadImg = async () => {
        setUploading(true);
        let nameArray = capturedImage.uri.split("/");
        let name = nameArray[nameArray.length - 1];
        let formattedName = formatImageName(name);
        const manipResult = await ImageManipulator.manipulateAsync(
            capturedImage.uri,
            [{ resize: { width: 400, height: 400 } }],
            { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
        );
        const file = {
            uri: manipResult.uri,
            name: formattedName,
            type: "image/jpeg",
        };
        const folder = `mobile/${params.school.toLowerCase().replace(/ /g, '-')}/student/${file.name}`;
        const res = await uploadFileToS3(file, folder);
        if (res.httpStatusCode === 200) {
            setUploading(false);
            const imagePayload = {
                image_src: S3_PATHNAME + folder,
                school_id: item.school_id,
                parent_id: item.id,
                parent: 'student',
                type: 'normal'
            };

            try {
                const createImageResponse = await API.CommonAPI.createOrUpdate(imagePayload, 'image', {
                    parent_id: item.id,
                    school_id: item.school_id,
                    parent: 'student',
                    type: 'normal'
                });
                console.log("Create Image API response:", createImageResponse);
            } catch (error) {
                console.error("Error calling createImage API:", error);
            }
        }
    }

    const styles = StyleSheet.create({
        plusBox: {
            height: WINDOW_HEIGHT / 4,
            width: WINDOW_WIDTH - 250,
            borderRadius: 5,
            backgroundColor: MD3Colors.secondary20,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            margin: 7

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
            backgroundColor: theme.colors.green[500],
            marginBottom: 10,
            zIndex: 1
        },
        detailText: {
            color: theme.colors.white[500],
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
        icon: {
            color: theme.colors.white[500]
        },
    });

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
    // console.log('hellllllooooooooooooo', previewVisible, loading, params);

    return (
        <>
            {
                cameraVisible ? (
                    <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} >
                        <FAB
                            icon="close"
                            style={styles.fab}
                            large
                            onPress={() => setCameraVisible(false)}
                        />
                        <View style={styles.cameraButtonContainer}>
                            <View style={{
                                position: 'absolute',
                                bottom: 0,
                                flex: 1,
                                width: '100%',
                                justifyContent: 'space-between',
                            }}>
                                {!loading ? (
                                    <View style={{
                                        alignSelf: 'center',
                                        flex: 1,
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                width: 70,
                                                height: 70,
                                                borderRadius: 50,
                                                backgroundColor: '#fff',
                                            }}
                                            onPress={clickPhoto} />
                                    </View>
                                ) : (
                                    <ActivityIndicator size={'large'} animating={true} color={MD3Colors.primary100} />
                                )}
                            </View>
                        </View>
                    </Camera >
                ) : (
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
                        backgroundColor: MD2Colors.blue200,
                    }}>
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: "center" }}>
                            <View style={styles.plusBox}>
                                {(previewVisible && capturedImage) || item.image_src ? (
                                    <CameraPreview photo={capturedImage?.uri || item?.image_src} />
                                ) : (
                                    <TouchableOpacity style={styles.plusButton} onPress={handleOpenCamera}>
                                        <IconButton
                                            icon="plus-circle"
                                            iconColor={MD3Colors.error30}
                                            size={50}
                                        />
                                    </TouchableOpacity>
                                )}
                            </View>
                            {previewVisible &&
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                                    {!uploading ? (
                                        <>
                                            <TouchableOpacity onPress={() => {
                                                setCapturedImage(null);
                                                setPreviewVisible(false);
                                                handleOpenCamera();
                                            }}>
                                                <IconButton
                                                    icon="camera"
                                                    iconColor={MD3Colors.error30}
                                                    size={30}
                                                />
                                                <Text style={{ marginLeft: 10 }}>Retake</Text>
                                            </TouchableOpacity>
                                            {capturedImage &&
                                                <TouchableOpacity onPress={uploadImg}>
                                                    <IconButton
                                                        icon="upload"
                                                        iconColor={MD3Colors.error30}
                                                        size={30}
                                                    />
                                                    <Text style={{ marginLeft: 10 }}>Upload</Text>
                                                </TouchableOpacity>}
                                        </>) : (
                                        <ActivityIndicator size={'small'} animating={true} color={MD3Colors.primary100} />
                                    )
                                    }
                                </View>
                            }
                        </View>
                        <View style={{
                            width: '50%', borderRadius: 5,
                        }}>
                            <Text style={styles.titleText}>Name:</Text><Text style={styles.titleLabelText}>{item?.studentName}</Text>
                            <Text style={styles.titleText}> Class:</Text><Text style={styles.titleLabelText}>{item?.className}</Text>
                            <Text style={styles.titleText}> Father&#39;s Name:</Text><Text style={styles.titleLabelText}>{item?.father_name}</Text>
                            <Text style={styles.titleText}> Gender: </Text><Text style={styles.titleLabelText}>{item?.gender}</Text>
                            <Text style={styles.titleText}> blood Group:</Text><Text style={styles.titleLabelText}>{item?.blood_group}</Text>
                        </View>
                    </SafeAreaView>
                )}
        </>
    );
};

ListingTable.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object,
    photo: PropTypes.object,
    flatListRef: PropTypes.object
};

export default ListingTable;
