/**
 * Copyright © 2023, School CRM Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of School CRM Inc., and is licensed as
 * restricted rights software. The use,reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with School CRM.
 */

import PropTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';
import { Alert, SafeAreaView, View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import { Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';

import { FONT, SIZES } from "../../../assets/constants";

export const WINDOW_WIDTH = Dimensions.get('window').width;

const WINDOW_HEIGHT = Dimensions.get('window').height;

export const ListingTable = ({ item, index, theme }) => {
    // const [hasPermission, setHasPermission] = useState(null);
    const [cameraVisible, setCameraVisible] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [previewVisible, setPreviewVisible] = useState(false)
    const cameraRef = useRef(null);

    const handleOpenCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
            setCameraVisible(true);
        } else {
            Alert.alert('Permission Denied', 'Camera permission is required to use this feature.');
        }
    };

    const clickPhoto = async () => {
        console.log('click photo');
        if (cameraRef.current) {
            let photo = await cameraRef.current.takePictureAsync();
            setCameraVisible(false);
            setCapturedImage(photo);
            setPreviewVisible(true);
            console.log(photo.uri, 'photo url')
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: WINDOW_HEIGHT / 5.5,
            width: WINDOW_WIDTH - 25,
            borderWidth: 2,
            borderColor: 'red',
            paddingHorizontal: 10,
            margin: 15,
        },
        plusBox: {
            height: WINDOW_HEIGHT / 8,
            width: WINDOW_WIDTH - 250,
            borderRadius: 10,
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2
        },
        plusButton: {
            width: 40,
            height: 40,
            borderRadius: 30,
            backgroundColor: '#007AFF',
            justifyContent: 'center',
            alignItems: 'center'
        },
        camera: {
            flex: 1,
        },
        cameraButtonContainer: {
            flex: 1,
            width: '90%',
            height: 400,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            margin: 20,
        },
        titleText: {
            color: theme.colors.blue[700],
            fontFamily: FONT.regular,
            fontSize: SIZES.medium,
            paddingTop: SIZES.small,
            paddingLeft: SIZES.xSmall,
            letterSpacing: 0.22,
            fontWeight: '400',
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
        icon: {
            color: theme.colors.white[500]
        },
    });

    const CameraPreview = ({ photo }) => {
        console.log('sdsfds', photo)
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
                    source={{ uri: photo && photo.uri }}
                    style={{
                        flex: 1
                    }}
                />
            </View>
        )
    }

    return (
        <>
            {cameraVisible ? (
                <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} >
                    <View style={styles.cameraButtonContainer}>
                        <View style={{
                            position: 'absolute',
                            bottom: 0,
                            flex: 1,
                            width: '100%',
                            justifyContent: 'space-between',
                        }}>
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
                                    onPress={() => clickPhoto()} />
                            </View>
                        </View>
                    </View>
                </Camera >
            ) : (
                <SafeAreaView style={styles.container}>
                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <View style={styles.plusBox}>
                            {previewVisible && capturedImage ? (
                                <CameraPreview photo={capturedImage} />
                            ) : (
                                <TouchableOpacity style={styles.plusButton} onPress={handleOpenCamera}>
                                    <MaterialIcons name="add" size={28} color="fuchsia" />
                                </TouchableOpacity>
                            )}
                        </View>
                        {previewVisible && capturedImage &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                                <TouchableOpacity onPress={() => {
                                    setCapturedImage(null);
                                    setPreviewVisible(false);
                                    handleOpenCamera();
                                }}>
                                    <Text>
                                        Retake
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text>
                                        Upload
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                    <View style={{ borderWidth: 1, width: '50%' }}>
                        <Text style={styles.titleText}>{item.firstname} {item.lastname}</Text>
                        <Text style={styles.titleText}> Class {item.class}</Text>
                        {/* <Text style={styles.subText}>Due date</Text> */}
                    </View>
                </SafeAreaView>
            )}
        </>
    );
};

ListingTable.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    theme: PropTypes.object
};

export default ListingTable;
